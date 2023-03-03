import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ITransaction } from '../interface/transaction.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from 'src/dto/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('Transaction') private transactionModel: Model<ITransaction>,
  ) {}

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<ITransaction> {
    const newTransaction = new this.transactionModel(createTransactionDto);
    return newTransaction.save();
  }

  async updateTransaction(
    userId: string,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<ITransaction> {
    const existingTransaction = await this.transactionModel.findByIdAndUpdate(
      userId,
      updateTransactionDto,
      { new: true },
    );
    if (!existingTransaction) {
      throw new NotFoundException(`Transaction #${userId} not found`);
    }
    return existingTransaction;
  }

  async getAllTransactions(): Promise<ITransaction[]> {
    const userData = await this.transactionModel.find();
    if (!userData || userData.length == 0) {
      throw new NotFoundException('Transactions data not found!');
    }
    return userData;
  }

  async getTransaction(transactionId: string): Promise<ITransaction> {
    const existingTransaction = await this.transactionModel
      .findById(transactionId)
      .exec();
    if (!existingTransaction) {
      throw new NotFoundException(`Transaction not found`);
    }
    return existingTransaction;
  }

  async getTransactionByUser(userId: string): Promise<ITransaction> {
    const existingTransaction = await this.transactionModel
      .findOne({ userId })
      .exec();
    if (!existingTransaction) {
      throw new NotFoundException(`Transaction #${userId} not found`);
    }
    return existingTransaction;
  }
}
