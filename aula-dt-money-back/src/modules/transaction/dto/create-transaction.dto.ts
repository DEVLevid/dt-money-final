import { TransactionType } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateTransactionDto {
  @IsString({ message: 'Title must be a string' })
  @MinLength(5, { message: 'Title must be at least 5 characters long' })
  title: string;
  @IsString({ message: 'Category must be a string' })
  category: string;

  @IsDateString({}, { message: 'Data must be a valid date string' })
  data: Date;

  @IsNumber({}, { message: 'Price must be a number' })
  price: number;

  @IsEnum(TransactionType)
  type: TransactionType;
}
