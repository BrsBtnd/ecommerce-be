import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  @IsString()
  name: string;

  @Prop()
  @IsNumber()
  @IsPositive()
  price: number;

  @Prop()
  @IsString()
  manufacturer: string;

  @Prop()
  @IsString()
  description: string;

  @Prop({ alias: 'type' })
  @IsString()
  category: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
