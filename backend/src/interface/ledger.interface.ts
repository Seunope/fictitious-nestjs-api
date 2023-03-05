import { Document } from 'mongoose';

type TransType = 'credit' | 'debit';

export interface ILedger extends Document {
  readonly userId: string;
  readonly type: TransType;
  readonly amount: string;
  readonly walletId: string;
  readonly reference: string;
  readonly transactionId: string;
  readonly oldWalletBalance: number;
  readonly newWalletBalance: number;
}
