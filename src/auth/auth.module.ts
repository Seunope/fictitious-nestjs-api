import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { UserSchema } from 'src/schema/user.schema';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { WalletService } from 'src/wallet/wallet.service';
import { WalletSchema } from 'src/schema/wallet.schema';
import { TransactionSchema } from 'src/schema/transaction.schema';
import { LedgerSchema } from 'src/schema/ledger.schema';
import { LedgerService } from 'src/ledger/ledger.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'adafakjgajdvasjdvagskdasdgad', // process.env.JWT_SECRET, // new ConfigService().get('JWT_SECRET'), // process.env.JWT_SECRET,
      signOptions: { expiresIn: '120m' },
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Wallet', schema: WalletSchema },
      { name: 'Ledger', schema: LedgerSchema },
      { name: 'Transaction', schema: TransactionSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    WalletService,
    LedgerService,
  ],
})
export class AuthModule {}
