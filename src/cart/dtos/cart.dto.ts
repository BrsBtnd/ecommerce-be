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
  @Transform(({ obj }) => {
    const transformedProducts: any = plainToInstance(ProductDto, obj.products, {
      excludeExtraneousValues: true,
    });

    return transformedProducts?.map((product: ProductDto, index: number) => ({
      ...product,
      id: obj.products[index]._id,
    }));
  })
  products: ProductDto[];
}
