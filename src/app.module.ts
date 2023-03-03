import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { WalletModule } from './wallet/wallet.module';
import { WalletSchema } from './schema/wallet.schema';
import { WalletService } from './wallet/wallet.service';
import { WalletController } from './wallet/wallet.controller';
import { TransactionModule } from './transaction/transaction.module';
import { TransactionSchema } from './schema/transaction.schema';
import { TransactionController } from './transaction/transaction.controller';
import { TransactionService } from './transaction/transaction.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      dbName: 'wegro',
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Wallet', schema: WalletSchema },
      { name: 'Transaction', schema: TransactionSchema },
    ]),
    AuthModule,
    UserModule,
    WalletModule,
    TransactionModule,
  ],
  providers: [UserService, WalletService, TransactionService],
  controllers: [UserController, WalletController, TransactionController],
})
export class AppModule {}
