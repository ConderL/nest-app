import {
  Controller,
  Get,
  Inject,
  Query,
  SetMetadata,
  UseFilters,
  UseInterceptors,
  Headers,
  Ip,
  Session,
  Render,
  // UsePipes,
  // UseGuards
} from '@nestjs/common';
import { AppService } from './app.service';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';
// import { LoginGuard } from './login.guard';

@Controller()
@SetMetadata('roles', ['user'])
// @UseInterceptors(TimeInterceptor) // 也可以在 controller 级别启动，作用于下面的全部 handler
// @UsePipes(ValidatePipe)
export class AppController {
  // constructor(private readonly appService: AppService) {} // 构造器注入

  // 属性注入
  @Inject(AppService)
  appService: AppService;

  @Get()
  // @UseGuards(LoginGuard)
  @UseInterceptors(TimeInterceptor)
  @SetMetadata('roles', ['admin'])
  getHello(
    @Headers('accept') accept: string,
    @Headers() headers: Record<string, any>,
    @Ip() ip: string,
    @Session() session,
  ): string {
    // console.log(accept, headers);
    // console.log(ip);
    // console.log(session);

    if (!session.count) {
      session.count = 1;
    } else {
      session.count++;
    }

    return `${this.appService.getHello()}
    session:${JSON.stringify(session, null, 2)}`;
  }

  @Get('validate')
  @UseFilters(TestFilter)
  getValidate(@Query('num', ValidatePipe) num: number) {
    return num;
  }

  @Get('hbs')
  @Render('hbs')
  render() {
    return { name: 'hbs' };
  }
}
