import {
  Controller,
  Get,
  HostParam,
  Req,
  Res,
  Next,
  HttpCode,
  Header,
  Redirect,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// @Controller({ host: /[\d\.]+/, path: 'host' })
@Controller({ host: ':a.:b.:c.:d', path: 'host' })
export class HostController {
  @Get()
  main(@HostParam() host, @Req() req: Request) {
    console.log(req.hostname, req.url);
    return host;
  }

  @Get('res')
  @Header('name', 'conder')
  res(@Res({ passthrough: true }) res: Response) {
    console.log(res.statusCode);

    return 'res';
  }

  @Get('next')
  next(@Next() next: NextFunction) {
    next();
    return 'next1';
  }

  @Get('next')
  @HttpCode(789)
  next2() {
    return 'next2';
  }

  @Get('redirect')
  @Redirect('https://www.baidu.com')
  redirect() {
    return 'redirect';
  }
}
