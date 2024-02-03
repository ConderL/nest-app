import { DynamicModule, Module } from '@nestjs/common';
import { MyLoggerModule } from './myLoggerModule';

@Module({})
export class DynamicLoggerModule {
  static register(options): DynamicModule {
    return {
      module: DynamicLoggerModule,
      providers: [
        MyLoggerModule,
        {
          provide: 'LOG_OPTIONS',
          useValue: options,
        },
      ],
      exports: [MyLoggerModule, 'LOG_OPTIONS'],
    };
  }
}
