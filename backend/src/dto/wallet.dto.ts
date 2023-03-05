import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateWalletDto {
  @IsObject()
  @IsNotEmpty()
  readonly userId: string;

  @IsString()
  @MaxLength(11)
  @IsNotEmpty()
  readonly walletNumber: string;

  @IsNotEmpty()
  @IsNumber()
  readonly balance: number;

  @IsBoolean()
  readonly isActive: boolean;
}

export class UpdateWalletDto extends PartialType(CreateWalletDto) {}
