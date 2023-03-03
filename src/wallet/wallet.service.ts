import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IWallet } from '../interface/wallet.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWalletDto, UpdateWalletDto } from 'src/dto/wallet.dto';

@Injectable()
export class WalletService {
  constructor(@InjectModel('Wallet') private walletModel: Model<IWallet>) {}

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

  async creditWallet(userId: string, amount: number): Promise<IWallet> {
    const userWallet = await this.getWalletByUser(userId);

    if (!userWallet) {
      throw new NotFoundException(`Wallet #${userId} not found`);
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
}
