import { Controller, Get, Param } from '@nestjs/common';

@Controller('lucas')
export class LucasController {
  @Get('say')
  getSay() {
    return '哈哈哈';
  }
  @Get(':id')
  getId(@Param('id') id: string) {
    return `传入的id为 ${id}`;
  }
}
