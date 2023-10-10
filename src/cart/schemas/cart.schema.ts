import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsString } from 'class-validator';
import { Product } from '../../products/schemas/product.schema';

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
  @Prop()
  @IsString()
  userId: string;

  @Prop()
  products: Product[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
