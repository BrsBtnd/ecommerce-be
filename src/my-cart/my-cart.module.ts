import { Module } from '@nestjs/common';
import { MyCartService } from './my-cart.service';

@Module({
  providers: [MyCartService]
})
export class MyCartModule {}
