import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
// import { FakeDataGenService } from '../fake-data-gen/fake-data-gen.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>, // private dataGenService: FakeDataGenService,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async findOne(productId: string): Promise<Product> {
    if (!productId) {
      return null;
    }

    return this.productModel.findOne({ _id: productId }).exec();
  }

  async findMultipleById(productIds: string[]) {
    if (!productIds) {
      return null;
    }

    return this.productModel.find({ _id: { $in: productIds } }).exec();
  }
}
