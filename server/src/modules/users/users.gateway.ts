import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from "socket.io";
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { WsAuthGuard } from '../auth/ws-auth.guard';

let usersMap = new Map<string, string>();

@WebSocketGateway({
  cors: {
    origin: "*"
  },
})
export class UsersGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly userService: UsersService) {}

  @WebSocketServer() server: Server;

  // @UseGuards(WsAuthGuard)
  @SubscribeMessage('users')
  handleGetOnlineUsers() {
    console.log(usersMap.entries());

    const res = [];
    usersMap.forEach(([k, v]) => res.push({ socket: k, userId: v }));
    
    this.server.emit("users:online", res);
  }
  
  afterInit(server: Server) {
    console.log(server);
  }
  
  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    console.log(`User connected`, client.id);
    usersMap.set(client.id, userId);

    this.handleGetOnlineUsers();
  }

  handleDisconnect(client: Socket) {
    console.log(`User disconnected`, client.id);
    usersMap.delete(client.id);

    this.handleGetOnlineUsers();
  }
}
