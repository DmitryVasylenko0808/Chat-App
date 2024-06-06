import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from "socket.io";
import { Logger, UseGuards } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { MessagesService } from './messages.service';
import { WsAuthGuard } from '../auth/ws.auth.guard';

@WebSocketGateway({
  cors: {
    origin: "*"
  },
})
@UseGuards(WsAuthGuard)
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
    console.log("Connected");
  }

  handleDisconnect(client: Socket) {
    let userId: string;

    for(const [k, v] of this.usersMap.entries()) {
      if (v === client.id) {
        userId = k;

        break;
      }
    }
    
    this.usersMap.delete(userId);

    console.log("DisConnected", this.usersMap);
  }

  @SubscribeMessage("user:online") 
  handleUserOnline(client: Socket) {
    const userId = client["userId"];

    this.usersMap.set(userId, client.id);
    
    console.log("users", this.usersMap);
  }

  @SubscribeMessage("chats:get") 
  async handleGetChats(client: Socket) {
    // const userId = client.handshake.query.userId as string;

    const userId = client["userId"];

    console.log("chats", userId);

    const chats = await this.chatsService.get(userId);

    console.log(chats);;

    client.emit("chats", chats);
  }

  @SubscribeMessage("chats:join")
  async handleJoinChat(client: Socket, payload: { chatId: string }) {
    const chat = await this.chatsService.getById(payload.chatId);

    console.log(payload.chatId);
    
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
