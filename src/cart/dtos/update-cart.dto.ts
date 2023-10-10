import { IsArray, IsString, MinLength } from 'class-validator';

export class UpdateCartDto {
  @IsString({ each: true })
  @MinLength(24, { each: true })
  @IsArray()
  products: string[];
}
