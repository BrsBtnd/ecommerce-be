import { Expose, plainToInstance, Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';
import { ProductDto } from '../../products/dtos/product.dto';

export class CartDto {
  @Expose()
  @IsString()
  @MinLength(24)
  id: string;

  @Expose()
  @IsString()
  userId: string;

  @Expose()
  @Transform(({ obj }) =>
    plainToInstance(ProductDto, obj.products, {
      excludeExtraneousValues: true,
    }),
  )
  products: ProductDto[];
}
