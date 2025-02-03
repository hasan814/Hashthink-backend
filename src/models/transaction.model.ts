import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({ required: true })
  to: string;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, enum: ['Approved', 'Pending'] })
  status: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
