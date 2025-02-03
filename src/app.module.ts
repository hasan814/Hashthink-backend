import { Transaction, TransactionSchema } from './models/transaction.model';
import { TransactionsController } from './controllers/transaction.controller';
import { TransactionsService } from './services/transactions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SocketService } from './services/socket.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/fullstack-test'),
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }])
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, SocketService],
  exports: [TransactionsService],
})
export class AppModule { }
