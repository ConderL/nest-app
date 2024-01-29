import { Controller, Get, Inject } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } from './dynamic.definition';

@Controller('dynamic2-module')
export class Dynamic2Controller {
  @Inject(MODULE_OPTIONS_TOKEN)
  private readonly options: typeof OPTIONS_TYPE;

  @Get()
  getHello() {
    return this.options;
  }
}
