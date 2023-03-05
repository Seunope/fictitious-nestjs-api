import { Document } from 'mongoose';

type TransType = 'credit' | 'debit';
type PlatformType = 'paystack' | 'flutter' | 'InApp' | 'Others';
type TransStatus = 'pending' | 'success' | 'failed';

export interface ITransaction extends Document {
  readonly meta: object;
  readonly amount: string;
  readonly userId: string;
  readonly type: TransType;
  readonly reference: number;
  readonly description: string;
  readonly status: TransStatus;
  readonly platform: PlatformType;
}
