import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { ProductDto } from './dtos/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @UseInterceptors(new SerializeInterceptor(ProductDto))
  getAllProducts() {
    return this.productsService.findAll();
  }

  @Get('/:id')
  @UseInterceptors(new SerializeInterceptor(ProductDto))
  async getProduct(@Param('id') id: string) {
    const product = await this.productsService.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product with productId: ${id} not found!`);
    }
    return product;
  }
}
