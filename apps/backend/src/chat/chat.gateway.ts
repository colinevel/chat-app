import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3001', // Replace with your React app's URL
    methods: ['GET', 'POST'],
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private users = 0;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleConnection(client: Socket) {
    this.users++;
    this.server.emit('users', this.users); // Broadcast number of users
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleDisconnect(client: Socket) {
    this.users--;
    this.server.emit('users', this.users); // Broadcast updated number of users
  }

  @SubscribeMessage('send_message')
  handleMessage(client: Socket, message: { sender: string; content: string }) {
    console.log('eee', message);
    this.server.emit('receive_message', message); // Broadcast the message to all clients
  }
}
