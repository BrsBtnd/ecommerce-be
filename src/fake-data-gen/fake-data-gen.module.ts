import { Module } from '@nestjs/common';
import { FakeDataGenService } from './fake-data-gen.service';

@Module({
  providers: [FakeDataGenService],
})
export class FakeDataGenModule {}
