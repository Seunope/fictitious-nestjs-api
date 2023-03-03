import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { randomInt } from 'crypto';
import { format } from 'date-fns';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/interface/user.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user.dto';
import { WalletService } from 'src/wallet/wallet.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<IUser>,
    private readonly walletService: WalletService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    createUserDto.password = hashedPassword;
    const newUser = new this.userModel(createUserDto);

    const accountNUmber = `1${format(new Date(), 'ddMMyy')}${randomInt(
      10,
      99,
    )}${format(new Date(), 's')}`;

    if (newUser) {
      const data = {
        balance: 0,
        isActive: true,
        walletNumber: accountNUmber,
        userId: newUser._id,
      };
      await this.walletService.createWallet(data);
    }

    return newUser.save();
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    const existingUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true },
    );
    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return existingUser;
  }

  async getAllUsers(): Promise<IUser[]> {
    const userData = await this.userModel.find();
    if (!userData || userData.length == 0) {
      throw new NotFoundException('Users data not found!');
    }
    return userData;
  }

  async getUser(userId: string): Promise<IUser> {
    const existingUser = await this.userModel.findById(userId).exec();
    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    delete existingUser.password;

    return existingUser;
  }

  async getUserByEmail(email: string, isSignUp = false): Promise<IUser> {
    const existingUser = await this.userModel
      .findOne({
        email,
      })
      .exec();
    if (!existingUser && !isSignUp) {
      throw new NotFoundException(`User #${email} not found`);
    }
    return existingUser;
  }

  async deleteUser(userId: string): Promise<IUser> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return deletedUser;
  }
}
