import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  // providers: [JwtStrategy],
  // controllers: [WalletController],
})
export class WalletModule {}
