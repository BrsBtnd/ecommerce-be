import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { ProductDto } from './dtos/product.dto';
import mongoose from 'mongoose';

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
    return await this.productsService.findOne(new mongoose.Types.ObjectId(id));
  }
}
