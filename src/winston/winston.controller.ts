import { Controller, Post, Body } from '@nestjs/common';

@Controller('winston')
export class WinstonController {
  @Post()
  log(@Body() body) {
    console.log(body);
  }
}
