import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Ledger {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  reference: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  walletId: string;

  @Prop()
  transactionId: string;

  @Prop({ required: true, type: mongoose.Types.Decimal128 })
  amount: number;

  @Prop({ required: true, type: mongoose.Types.Decimal128 })
  oldWalletBalance: number;

  @Prop({ required: true, type: mongoose.Types.Decimal128 })
  newWalletBalance: number;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}
export const LedgerSchema = SchemaFactory.createForClass(Ledger);
