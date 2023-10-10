import { IsString } from 'class-validator';
import { plainToInstance, Transform } from 'class-transformer';
import { ProductDto } from '../../products/dtos/product.dto';

export class UpdateCartDto {
  @IsString()
  userId: string;

  @Transform(({ obj }) =>
    plainToInstance(ProductDto, obj.products, {
      excludeExtraneousValues: true,
    }),
  )
  products: ProductDto[];
}
