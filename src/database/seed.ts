import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { TransactionsService } from 'src/services/transactions.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const transactionsService = app.get(TransactionsService);

  const sampleTransactions = [
    { to: "Alice", amount: 100, currency: "USD", status: "Pending" },
    { to: "Bob", amount: 250, currency: "EUR", status: "Approved" },
    { to: "Charlie", amount: 500, currency: "GBP", status: "Pending" },
  ];

  for (const transaction of sampleTransactions) {
    await transactionsService.create(transaction);
  }

  console.log("✅ Sample transactions added!");
  await app.close();
}

seed();
