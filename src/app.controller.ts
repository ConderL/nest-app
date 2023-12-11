import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {} // 构造器注入

  // 属性注入
  @Inject(AppService)
  appService: AppService;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
