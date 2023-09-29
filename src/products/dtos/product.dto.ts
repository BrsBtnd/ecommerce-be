import { Expose } from 'class-transformer';
import {
  IS_HEXADECIMAL,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ProductDto {
  @Expose()
  @IsString()
  @MinLength(24)
  id: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsNumber()
  @IsPositive()
  price: number;

  @Expose()
  @IsString()
  manufacturer: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsString()
  type: string;
}
