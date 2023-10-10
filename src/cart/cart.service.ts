import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './schemas/cart.schema';
import { Model } from 'mongoose';
import { CreateCartDto } from './dtos/create-cart.dto';
import { UpdateCartDto } from './dtos/update-cart.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async findAll(): Promise<Cart[]> {
    return await this.cartModel.find().exec();
  }

  async findOne(cartId: string): Promise<Cart> {
    if (!cartId) {
      return null;
    }

    return this.cartModel.findOne({ _id: cartId }).exec();
  }

  async create(cartDto: CreateCartDto) {}

  async addToCart(cartDto: UpdateCartDto, cartId: string) {}
}
