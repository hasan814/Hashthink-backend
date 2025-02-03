import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransactionsService } from '../services/transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @Get()
  getAll() {
    return this.transactionsService.getAll();
  }

  @Post()
  createTransaction(@Body() transactionData) {
    return this.transactionsService.create(transactionData);
  }
}
