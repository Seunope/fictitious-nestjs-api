import { Document } from 'mongoose';

export interface IWallet extends Document {
  readonly walletNumber: string;
  readonly userId: string;
  readonly balance: number;
  readonly isActive: string;
}
