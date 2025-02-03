import { Transaction, TransactionDocument } from '../models/transaction.model';
import { TransactionsGateway } from '../gateways/transactions.gateway';
import { QueueService } from './queue.service';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
    private queueService: QueueService,
    private transactionsGateway: TransactionsGateway,
  ) { }

  async create(transactionData): Promise<Transaction> {
    const transaction = new this.transactionModel(transactionData);
    await transaction.save();

    this.queueService.addTransactionToQueue(transaction);

    return transaction;
  }

  async getAll(): Promise<Transaction[]> {
    return this.transactionModel.find().exec();
  }

  async processQueuedTransactions() {
    this.queueService.consumeTransactions(async (transaction) => {

      const savedTransaction = new this.transactionModel(transaction);
      await savedTransaction.save();

      this.transactionsGateway.sendNewTransaction(savedTransaction);
    });
  }
}
