import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common';
import { AaaFilter } from './aaa.filter';
import { AaaException } from './AaaException';
import { AaaGuard } from './aaa.guard';
import { Roles } from './roles.decorator';
import { Role } from './roles';

@Controller('execution')
export class AaaController {
  @UseFilters(AaaFilter)
  @UseGuards(AaaGuard)
  @Roles(Role.Admin)
  @Get()
  getHello(): string {
    throw new AaaException('aaa', 'bbb');
  }
}
