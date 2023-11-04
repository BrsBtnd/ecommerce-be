import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FakeDataGenModule } from './fake-data-gen/fake-data-gen.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${
        process.env.NODE_ENV === 'production' ? '' : '.development'
      }`,
    }),
    ProductsModule,
    CartModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          uri: config.get<string>('MONGO_DB'),
        };
      },
    }),
    FakeDataGenModule,
  ],
})
export class AppModule {}
