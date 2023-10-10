import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from './cart.controller';
import { ProductsService } from '../products/products.service';
import { Cart, CartSchema } from './schemas/cart.schema';
import { Product } from '../products/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
      { name: Product.name, schema: Product },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService, ProductsService],
})
export class CartModule {}
