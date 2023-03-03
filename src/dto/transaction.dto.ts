import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class CreateTransactionDto {
  @IsObject()
  @IsNotEmpty()
  readonly userId: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @IsString()
  @IsNotEmpty()
  readonly status: string;

  @IsString()
  @IsNotEmpty()
  readonly reference: string;

  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @IsBoolean()
  readonly isActive: boolean;
}

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {}
