import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { MyCartModule } from './my-cart/my-cart.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FakeDataGenModule } from './fake-data-gen/fake-data-gen.module';

@Module({
  imports: [
    ProductsModule,
    MyCartModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/ecommerce'), // atrakni env-be
    FakeDataGenModule,
  ],
})
export class AppModule {}
