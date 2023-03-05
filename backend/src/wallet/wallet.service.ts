import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IWallet } from '../interface/wallet.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWalletDto, UpdateWalletDto } from 'src/dto/wallet.dto';
import { LedgerService } from 'src/ledger/ledger.service';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel('Wallet') private walletModel: Model<IWallet>,
    private readonly ledgerService: LedgerService,
  ) {}

  async createWallet(createWalletDto: CreateWalletDto): Promise<IWallet> {
    const newWallet = new this.walletModel(createWalletDto);
    return newWallet.save();
  }

  async updateWallet(
    wallerId: string,
    updateWalletDto: UpdateWalletDto,
  ): Promise<IWallet> {
    const existingWallet = await this.walletModel.findByIdAndUpdate(
      wallerId,
      updateWalletDto,
      { new: true },
    );
    if (!existingWallet) {
      throw new NotFoundException(`Wallet #${wallerId} not found`);
    }
    return existingWallet;
  }

  async creditWallet(
    userId: string,
    amount: number,
    reference: string,
    transactionId: string,
    walletNumber?: string,
  ): Promise<IWallet> {
    let userWallet = null;
    if (walletNumber) {
      userWallet = await this.getWalletByNumber(walletNumber);
      if (!userWallet) {
        throw new NotFoundException(`Wallet #${walletNumber} not found`);
      }
    } else {
      userWallet = await this.getWalletByUser(userId);
      if (!userWallet) {
        throw new NotFoundException(`Wallet #${userId} not found`);
      }
    }

    const updateData = {
      balance: userWallet.balance + amount,
    };

    const existingWallet = await this.walletModel.findByIdAndUpdate(
      userWallet._id,
      updateData,
      { new: true },
    );

    if (!existingWallet) {
      throw new NotFoundException(`Wallet  balance not updated. Contact Admin`);
    }
    const ledgerData = {
      amount,
      reference,
      transactionId,
      type: 'credit',
      userId: userWallet.userId,
      walletId: userWallet._id,
      oldWalletBalance: userWallet.balance,
      newWalletBalance: userWallet.balance + amount,
    };
    await this.ledgerService.createLedger(ledgerData);
    return existingWallet;
  }

  async debitWallet(
    userId: string,
    amount: number,
    reference: string,
    transactionId: string,
  ): Promise<IWallet> {
    const userWallet = await this.getWalletByUser(userId);
    if (!userWallet) {
      throw new NotFoundException(`Wallet #${userId} not found`);
    }

    const updateData = {
      balance: userWallet.balance - amount,
    };

    const existingWallet = await this.walletModel.findByIdAndUpdate(
      userWallet._id,
      updateData,
      { new: true },
    );

    if (!existingWallet) {
      throw new NotFoundException(`Wallet  balance not updated. Contact Admin`);
    }
    const ledgerData = {
      amount,
      reference,
      transactionId,
      type: 'debit',
      userId: userWallet.userId,
      walletId: userWallet._id,
      oldWalletBalance: userWallet.balance,
      newWalletBalance: userWallet.balance - amount,
    };
    await this.ledgerService.createLedger(ledgerData);
    return existingWallet;
  }

  async getAllWallets(): Promise<IWallet[]> {
    const userData = await this.walletModel.find();
    if (!userData || userData.length == 0) {
      throw new NotFoundException('Wallets data not found!');
    }
    return userData;
  }

  async getWallet(walletId: string): Promise<IWallet> {
    const existingWallet = await this.walletModel.findById(walletId).exec();
    if (!existingWallet) {
      throw new NotFoundException(`Wallet not found`);
    }
    return existingWallet;
  }

  async getWalletByUser(userId: string): Promise<IWallet> {
    const existingWallet = await this.walletModel.findOne({ userId }).exec();
    if (!existingWallet) {
      throw new NotFoundException(`Wallet #${userId} not found`);
    }
    return existingWallet;
  }

  async getWalletByNumber(walletNumber: string): Promise<IWallet> {
    const existingWallet = await this.walletModel
      .findOne({ walletNumber })
      .exec();
    if (!existingWallet) {
      throw new NotFoundException(`Wallet #${walletNumber} not found`);
    }
    return existingWallet;
  }
}
