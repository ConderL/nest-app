import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  ParseArrayPipe,
  ParseBoolPipe,
  ParseFloatPipe,
  ParseIntPipe,
  ParseEnumPipe,
  Query,
  Param,
  ParseUUIDPipe,
  DefaultValuePipe,
  Post,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { PipePipe } from './pipe.pipe';
import { PipeDto } from './dto/pipeDto';
import { MyValidationPipe } from './myValidationPipe.pipe';

enum User {
  ADMIN = 'ADMIN',
  GUARD = 'GUARD',
}

@Controller('pipe')
export class PipeController {
  @Get()
  getHello(
    @Query(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_FOUND }),
    )
    id: string,
  ) {
    return id + 1;
  }
  @Get('error')
  getError(
    @Query(
      'id',
      new ParseIntPipe({
        exceptionFactory(error) {
          console.log(error, 'haha');
          throw new HttpException('xxx' + error, HttpStatus.NOT_FOUND);
        },
      }),
    )
    id: string,
  ) {
    return id;
  }

  @Get('float')
  getFloat(@Query('id', ParseFloatPipe) id: number) {
    return id + 1;
  }

  @Get('boolean')
  getBoolean(@Query('flag', ParseBoolPipe) flag: boolean) {
    return flag;
  }

  @Get('array')
  getArray(
    @Query(
      'arr',
      new ParseArrayPipe({
        optional: true,
        // items: Number,
        separator: '~',
      }),
    )
    arr: Array<number>,
  ) {
    return arr.reduce((p, c) => p + c);
  }

  @Get('enum/:enum')
  getEnum(@Param('enum', new ParseEnumPipe(User)) user: User) {
    return user;
  }

  @Get('uid/:uid')
  getUid(@Param('uid', ParseUUIDPipe) uid: string) {
    return uid;
  }

  @Get('default')
  getDefault(@Param('id', new DefaultValuePipe('defalut')) id: string) {
    return id;
  }

  @Get('custom/:id')
  getCustom(
    @Param('id', PipePipe) id: number,
    @Query('name', PipePipe) name: string,
  ) {
    return id + name;
  }

  @Post()
  post(@Body(ValidationPipe) obj: PipeDto) {
    console.log(obj);
  }

  @Post('my')
  myPost(@Body(MyValidationPipe) obj: PipeDto) {
    console.log(obj);
  }
}
