import { Module } from '@nestjs/common';
import { LargeFileController } from './large-file.controller';

@Module({
  controllers: [LargeFileController],
})
export class LargeFileModule {}
