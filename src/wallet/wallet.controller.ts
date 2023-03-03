import {
  Get,
  Req,
  Res,
  HttpStatus,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getWallet(@Req() request) {
    const userId = request.user.userId;
    const wallet = await this.walletService.getWalletByUser(userId);
    return {
      data: wallet,
    };
  }

  @Get('/all')
  async getWallets(@Res() response) {
    try {
      const walletData = await this.walletService.getAllWallets();
      return response.status(HttpStatus.OK).json({
        message: 'All wallets data found successfully',
        data: walletData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
