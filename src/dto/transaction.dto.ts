import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTransactionDto {
  @IsOptional()
  @IsObject()
  @IsNotEmpty()
  readonly userId?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly status?: string;

  @IsString()
  @IsNotEmpty()
  readonly reference: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly platform?: string;

  @IsString()
  @IsNotEmpty()
  readonly amount: number;

  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;
}

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {}
