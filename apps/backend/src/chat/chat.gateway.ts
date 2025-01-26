import { UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthGuard } from 'src/auth/jwt-auth.guard';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4000',
    methods: ['GET', 'POST'],
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private users = 0;

  @UseGuards(AuthGuard)
  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  @UseGuards(AuthGuard)
  handleConnection(client: Socket) {
    this.users++;
    this.server.emit('users', this.users, {}); // Broadcast number of users
  }

  handleDisconnect(client: Socket) {
    this.users--;
    this.server.emit('users', this.users); // Broadcast updated number of users
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('send_message')
  handleMessage(client: Socket, message: { sender: string; content: string }) {

    this.server.emit('receive_message', message); // Broadcast the message to all clients
  }
}
