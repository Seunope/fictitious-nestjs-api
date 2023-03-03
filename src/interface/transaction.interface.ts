import { Document } from 'mongoose';

type TransType = 'credit' | 'debit';
type TransStatus = 'pending' | 'success' | 'failed';

export interface ITransaction extends Document {
  readonly amount: string;
  readonly userId: string;
  readonly type: TransType;
  readonly reference: number;
  readonly description: string;
  readonly status: TransStatus;
}