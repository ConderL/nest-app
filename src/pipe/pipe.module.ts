import { Module } from '@nestjs/common';
import { PipeController } from './pipe.controller';

@Module({
  controllers: [PipeController],
  providers: [
    {
      provide: 'validation_options',
      useFactory() {
        return { a: 1, b: 2 };
      },
    },
  ],
})
export class PipeModule {}
