import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class TransactionsGateway {
  @WebSocketServer()
  server: Server;

  sendNewTransaction(transaction) {
    this.server.emit('newTransaction', transaction);
  }
}
