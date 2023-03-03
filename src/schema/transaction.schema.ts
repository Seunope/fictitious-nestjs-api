import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true, unique: true })
  reference: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, type: mongoose.Types.Decimal128 })
  amount: number;

  @Prop()
  description: string;

  @Prop()
  platform: string;

  @Prop()
  status: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
