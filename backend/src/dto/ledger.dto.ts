import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateLedgerDto {
  @IsObject()
  @IsNotEmpty()
  readonly userId: string;

  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @IsString()
  @IsNotEmpty()
  readonly reference: string;

  @IsObject()
  @IsNotEmpty()
  readonly walletId: string;

  @IsObject()
  @IsNotEmpty()
  readonly transactionId: string;

  @IsString()
  @IsNotEmpty()
  readonly amount: number;

  @IsString()
  @IsNotEmpty()
  readonly oldWalletBalance: number;

  @IsString()
  @IsNotEmpty()
  readonly newWalletBalance: number;

  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;
}

export class UpdateLedgerDto extends PartialType(CreateLedgerDto) {}
