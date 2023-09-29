import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  manufacturer: string;

  @IsString()
  description: string;

  @IsString()
  type: string;
}
