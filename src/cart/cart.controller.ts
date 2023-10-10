import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { CartDto } from './dtos/cart.dto';
import { CreateCartDto } from './dtos/create-cart.dto';
import { UpdateCartDto } from './dtos/update-cart.dto';

@Controller('carts')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  @UseInterceptors(new SerializeInterceptor(CartDto))
  getAllCarts() {
    return this.cartService.findAll();
  }

  @Get('/:id')
  @UseInterceptors(new SerializeInterceptor(CartDto))
  async getCart(@Param('id') id: string) {
    const cart = await this.cartService.findOne(id);

    if (!cart) {
      throw new NotFoundException(`Cart with cartId: ${id} not found!`);
    }

    return cart;
  }

  @Post()
  @UseInterceptors(new SerializeInterceptor(CartDto))
  async createCart(@Body() body: CreateCartDto) {
    const user = await this.cartService.create(body);

    if (!user) {
      throw new BadRequestException(
        `User with username: ${body.userId} already exists.`,
      );
    }
    return user;
  }

  @Patch('/:id')
  @UseInterceptors(new SerializeInterceptor(CartDto))
  async addProductToCart(@Body() body: UpdateCartDto, @Param('id') id: string) {
    const updatedCart = await this.cartService.addToCart(body, id);

    if (!updatedCart) {
      throw new NotFoundException(`Cart with cartId: ${id} not found!`);
    }
    return updatedCart;
  }
}
