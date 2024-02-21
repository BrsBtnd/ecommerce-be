import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './schemas/cart.schema';
import { Model } from 'mongoose';
import { CreateCartDto } from './dtos/create-cart.dto';
import { UpdateCartDto } from './dtos/update-cart.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    private productService: ProductsService,
  ) {}

  async findAll(): Promise<Cart[]> {
    return await this.cartModel.find().exec();
  }

  async findOne(cartId: string): Promise<Cart> {
    if (!cartId) {
      return null;
    }

    return this.cartModel.findOne({ _id: cartId }).exec();
  }

  async findByUser(userId: string): Promise<Cart> {
    if (!userId) {
      return null;
    }

    return this.cartModel.findOne({ userId }).exec();
  }

  async create(cartDto: CreateCartDto) {
    const userExists = await this.findByUser(cartDto.userId);

    if (userExists) {
      return null;
    }

    return this.cartModel.create({ userId: cartDto.userId, products: [] });
  }

  async addToCart(cartDto: UpdateCartDto, cartId: string) {
    const cart = await this.findOne(cartId);

    const products = await this.productService.findMultipleById(
      cartDto.products,
    );

    if (!cart) {
      return null;
    }

    if (products?.length === 0) {
      return this.cartModel
        .updateOne({ _id: cartId }, { $pull: { products: {} } })
        .exec();
    }

    return this.cartModel
      .updateOne({ _id: cartId }, { $set: { products: products } })
      .exec();
  }
}
