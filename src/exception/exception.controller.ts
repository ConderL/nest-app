import {
  BadRequestException,
  Controller,
  Get,
  //   HttpException,
  //   HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { ExFilter } from './exception.filter';
import { UnLoginException, UnloginFilter } from './unlogin.filter';

@Controller('exception')
@UseFilters(ExFilter, UnloginFilter)
export class ExceptionController {
  @Get()
  getHello() {
    // throw new HttpException('xxxx', HttpStatus.BAD_REQUEST);
    throw new BadRequestException('xxxx');
    return 'hello';
  }
  @Get('unLogin')
  getUnLogion() {
    throw new UnLoginException('unlogin');
  }
}
