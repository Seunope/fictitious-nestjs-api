import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Wallet {
  @Prop({ required: true, unique: true })
  walletNumber: string;
  @Prop({ required: true, unique: true })
  userId: string;
  @Prop({ default: 0, type: mongoose.Types.Decimal128 })
  balance: number;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}
export const WalletSchema = SchemaFactory.createForClass(Wallet);
