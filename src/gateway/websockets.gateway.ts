import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
// import { MessageService } from 'src/message/message.service';

@WebSocketGateway()
export class WebsocketsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor() {}
  @WebSocketServer()
  server;

  private logger: Logger = new Logger('AppGateway');

  // @SubscribeMessage('messageToServer')
  // handleMessage(client: Socket, message: any): void {
  //   const userInfo: any =  this.jwtService.decode(message.author);
  //   const decodedMessage = {
  //     author: userInfo.username,
  //     body: message.body,
  //   }
  //   this.server.emit('messageToClient', decodedMessage);
  //   this.messageService.createMessage(decodedMessage);
  // }

  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.server.emit('close', `client ${client.id} disconnected`);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    this.server.emit('connection', `client ${client.id} connected`);
  }
}
