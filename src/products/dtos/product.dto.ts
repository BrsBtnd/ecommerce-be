import { Expose } from 'class-transformer';

export class ProductDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  price: number;

  @Expose()
  manufacturer: string;

  @Expose()
  description: string;

  @Expose()
  type: string;
}

// validation
