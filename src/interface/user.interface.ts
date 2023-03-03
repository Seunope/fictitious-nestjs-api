import { Document } from 'mongoose';

export interface IUser extends Document {
  password: string;
  readonly email: string;
  readonly lastName: string;
  readonly firstName: string;
}
