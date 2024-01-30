import { Module } from '@nestjs/common';
import { InterceptorController } from './interceptor.controller';
import { InterceptorService } from './interceptor.service';

@Module({
  controllers: [InterceptorController],
  providers: [InterceptorService],
})
export class InterceptorModule {}
