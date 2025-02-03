import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
@WebSocketGateway({ cors: true })
export class SocketService implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  private clients = new Set<string>();

  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
    this.clients.add(client.id);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
    this.clients.delete(client.id);
  }

  sendNewTransaction(transaction: any) {
    console.log("📢 Sending new transaction to clients:", transaction);
    this.server.emit('newTransaction', transaction);
  }
}
