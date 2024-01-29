import { Get, UseGuards } from '@nestjs/common';
import { AaaGuard } from './aaa.guard';
import { Aaa } from './aaa.decorator';
import { Bbb } from './bbb.decorator';
import { MyHeaders } from './header.decorator';
import { MyQuery } from './query.decorator';
import { ClassDecorator } from './class.decorator';

@ClassDecorator()
export class AaaController {
  @Get()
  @Aaa('admin')
  @UseGuards(AaaGuard)
  getHello() {
    return 'hello custom-decorator';
  }

  @Bbb('hello2', 'admin')
  getHello2() {}

  @Get('hello3')
  getHello3(@MyHeaders() header, @MyQuery() query) {
    return `${JSON.stringify(header)} ${JSON.stringify(query)}`;
  }
}
