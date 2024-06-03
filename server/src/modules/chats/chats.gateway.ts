import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from "socket.io";
import { Logger } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { MessagesService } from './messages.service';

@WebSocketGateway({
  cors: {
    origin: "*"
  },
})
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private readonly logger = new Logger('ChatsGateway');
  private readonly usersMap = new Map<string, string>();

  constructor( 
    private readonly chatsService: ChatsService,
    private readonly messagesService: MessagesService
  ) {}
  
  @WebSocketServer() wss: Server;
  
  afterInit(server: any) {
    this.logger.log("Initialized!")
  }

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;

    this.usersMap.set(userId, client.id);
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId as string;

    this.usersMap.delete(userId);
  }

  @SubscribeMessage("chats:get") 
  async handleGetChats(client: Socket) {
    const userId = client.handshake.query.userId as string;

    const chats = await this.chatsService.get(userId);

    client.emit("chats", chats);
  }

  @SubscribeMessage("chats:join")
  async handleJoinChat(client: Socket, payload: { chatId: string }) {
    const chat = await this.chatsService.getById(payload.chatId);
    
    if (!chat) {
      client.emit("error", "Error");

      return;
    }
    
    const chatId = chat._id.toString();

    client.join(chatId);
    client.emit("chats:joined", chat);
  }

  @SubscribeMessage("chats:leave")
  handleLeaveChat(client: Socket, payload: { chatId: string }) {
    client.leave(payload.chatId);
  } 

  @SubscribeMessage("chats:create")
  async handleCreateChat(client: Socket, payload: { receiverId: string, message: string }) {
    const userId = client.handshake.query.userId as string;
    const { receiverId, message } = payload;

    const chat = await this.chatsService.create(userId, receiverId);
    const chatId = chat._id.toString();
    
    await this.messagesService.create(chatId, userId, message);

    this.updateChats(userId, receiverId);    
  }

  @SubscribeMessage("messages:get")
  async handleGetMessages(client: Socket, payload: { chatId: string }) {
    const { chatId } = payload;

    const messages = await this.messagesService.get(chatId);

    client.emit("messages", messages);
  }

  @SubscribeMessage("messages:send")
  async handleSendMessage(client: Socket, payload: { chatId: string, body: string }) {
    const senderId = client.handshake.query.userId as string;
    const { chatId, body } = payload;

    const chat = await this.chatsService.getById(chatId);

    if (!chat) {
      client.emit("error", "Error");

      return;
    }

    await this.messagesService.create(chatId, senderId, body);

    this.updateMessages(chatId)
  }

  private async updateChats(userId: string, receiverId: string) {
    const userChats = await this.chatsService.get(userId);
    const userSocketId = this.usersMap.get(userId);
    
    this.wss.to(userSocketId).emit("chats", userChats);

    const receiverChats = await this.chatsService.get(receiverId);
    const receiverSocketId = this.usersMap.get(receiverId);

    this.wss.to(receiverSocketId).emit("chats", receiverChats);
  }

  private async updateMessages(chatId: string) {
    const messages = await this.messagesService.get(chatId);

    this.wss.to(chatId).emit("messages", messages);
  }
}
