import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  manufacturer: string;

  @Prop()
  description: string;

  @Prop()
  type: string;
}

// validation

export const ProductSchema = SchemaFactory.createForClass(Product);
