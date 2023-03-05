import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLedgerDto } from 'src/dto/ledger.dto';
import { ILedger } from 'src/interface/ledger.interface';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class LedgerService {
  constructor(@InjectModel('Ledger') private ledgerModel: Model<ILedger>) {}

  async createLedger(createLedgerDto: CreateLedgerDto): Promise<ILedger> {
    const newLedger = new this.ledgerModel(createLedgerDto);
    return newLedger.save();
  }

  async getAllLedgers(): Promise<ILedger[]> {
    const ledgerData = await this.ledgerModel.find();
    if (!ledgerData || ledgerData.length == 0) {
      throw new NotFoundException('Ledgers data not found!');
    }
    return ledgerData;
  }

  async getLedger(ledgerId: string): Promise<ILedger> {
    const existingLedger = await this.ledgerModel.findById(ledgerId).exec();
    if (!existingLedger) {
      throw new NotFoundException(`Ledger #${ledgerId} not found`);
    }

    return existingLedger;
  }

  async getLedgerByWallet(walletId: string): Promise<ILedger> {
    const existingLedger = await this.ledgerModel
      .findOne({
        walletId,
      })
      .exec();
    if (!existingLedger) {
      throw new NotFoundException(`Ledger not found`);
    }
    return existingLedger;
  }

  async getLedgerByUser(userId: string): Promise<ILedger> {
    const existingLedger = await this.ledgerModel
      .findOne({
        userId,
      })
      .exec();
    if (!existingLedger) {
      throw new NotFoundException(`Ledger not found`);
    }
    return existingLedger;
  }
}
