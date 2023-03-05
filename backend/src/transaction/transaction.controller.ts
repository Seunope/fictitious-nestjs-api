import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { id } from 'date-fns/locale';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTransactionDto } from 'src/dto/transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @Post('fund')
  async deposit(
    @Req() request,
    @Res() response,
    @Body() createUserDto: CreateTransactionDto,
  ) {
    const userId = request.user.userId;
    const data = {
      ...createUserDto,
      userId,
      amount: Number(createUserDto.amount),
      type: 'credit',
    };

    try {
      const newTrans = await this.transactionService.createTransaction(data);

      return response.status(HttpStatus.CREATED).json({
        message: 'Transaction has been created successfully',
        data: newTrans,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: err.message || 'Error: User not created!',
        error: 'Bad Request',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('send-money')
  async withdraw(
    @Req() request,
    @Res() response,
    @Body() sendMoneyTransDto: CreateTransactionDto,
  ) {
    const userId = request.user.userId;

    if (!sendMoneyTransDto.receiverWalletNumber) {
      throw new NotFoundException(`Receiver wallet number is missing`);
    }

    const data = {
      ...sendMoneyTransDto,
      userId,
      meta: {
        receiverWalletNumber: sendMoneyTransDto.receiverWalletNumber,
        amount: sendMoneyTransDto.amount,
      },
      amount: Number(sendMoneyTransDto.amount),
      type: 'debit',
    };

    try {
      const newTrans = await this.transactionService.createTransaction(data);

      return response.status(HttpStatus.CREATED).json({
        message: 'Money has been successfully sent',
        data: newTrans,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: err.message || 'Error: User not created!',
        error: 'Bad Request',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getTransaction(@Req() request) {
    const userId = request.user.userId;
    const transaction = await this.transactionService.getTransactionsByUser(
      userId,
    );
    return {
      data: transaction,
    };
  }

  @Get('/all')
  async getTransactions(@Res() response) {
    try {
      const transactionData =
        await this.transactionService.getAllTransactions();
      return response.status(HttpStatus.OK).json({
        message: 'All transactions data found successfully',
        data: transactionData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
