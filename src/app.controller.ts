import {
  Controller,
  Get,
  Inject,
  Query,
  UseFilters,
  UseInterceptors,
  // UsePipes,
  // UseGuards
} from '@nestjs/common';
import { AppService } from './app.service';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';
// import { LoginGuard } from './login.guard';

@Controller()
// @UsePipes(ValidatePipe)
export class AppController {
  // constructor(private readonly appService: AppService) {} // 构造器注入

  // 属性注入
  @Inject(AppService)
  appService: AppService;

  @Get()
  // @UseGuards(LoginGuard)
  @UseInterceptors(TimeInterceptor)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('validate')
  @UseFilters(TestFilter)
  getValidate(@Query('num', ValidatePipe) num: number) {
    return num;
  }
}
