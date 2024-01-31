import { Global, Module } from '@nestjs/common';
import { LoggerController } from './logger.controller';

@Global()
@Module({
  controllers: [LoggerController],
})
export class LoggerModule {}
