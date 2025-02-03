import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect } from 'amqplib';

@Injectable()
export class QueueService implements OnModuleInit {
  private channel;
  private queueName = 'transactions';

  async onModuleInit() {
    const connection = await connect('amqp://localhost');
    this.channel = await connection.createChannel();
    await this.channel.assertQueue(this.queueName);
  }

  async addTransactionToQueue(transaction) {
    this.channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(transaction)));
  }

  async consumeTransactions(callback) {
    this.channel.consume(this.queueName, (msg) => {
      if (msg !== null) {
        const transaction = JSON.parse(msg.content.toString());
        callback(transaction);
        this.channel.ack(msg);
      }
    });
  }
}
