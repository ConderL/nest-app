import { Module, DynamicModule } from '@nestjs/common';
import { DynamicService } from './dynamic.service';
import { DynamicController } from './dynamic.controller';
import { ConfigurableModuleClass } from './dynamic.definition';

@Module({})
export class MyDynamicModule extends ConfigurableModuleClass {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: MyDynamicModule,
      controllers: [DynamicController],
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        DynamicService,
      ],
      exports: [],
    };
  }
}
