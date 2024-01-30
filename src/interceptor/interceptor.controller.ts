import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { InterceptorInterceptor } from './interceptor.interceptor';
import { MapInterceptor } from './map.interceptor';
import { TapInterceptor } from './tap.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { TimeoutInterceptor } from './timeout.interceptor';

@Controller('interceptor')
export class InterceptorController {
  @Get()
  @UseInterceptors(InterceptorInterceptor)
  getHello() {
    return 'hello interceptor';
  }
  @Get('map')
  @UseInterceptors(MapInterceptor)
  getMap() {
    return 'map';
  }
  @Get('tap')
  @UseInterceptors(TapInterceptor)
  getTap() {
    return 'tap';
  }
  @Get('error')
  @UseInterceptors(ErrorInterceptor)
  getError() {
    throw new Error('error');
  }
  @Get('timeout')
  @UseInterceptors(TimeoutInterceptor)
  async getTimeout() {
    await new Promise((res) => setTimeout(res, 5000));
    return 'timeout';
  }
}
