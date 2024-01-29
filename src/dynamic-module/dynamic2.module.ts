import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './dynamic.definition';
import { Dynamic2Controller } from './dynamic2.controller';

@Module({
  controllers: [Dynamic2Controller],
})
export class Dynamic2Module extends ConfigurableModuleClass {}
