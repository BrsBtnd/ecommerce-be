import { IsArray, IsString, MinLength } from 'class-validator';

export class UpdateCartDto {
  @IsArray()
  @IsString({ each: true })
  @MinLength(24, { each: true })
  products: string[];
}
