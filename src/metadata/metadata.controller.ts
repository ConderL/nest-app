import {
  Controller,
  Get,
  SetMetadata,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MetadataGuard } from './metadata.guard';
import { MetadataInterceptor } from './metadata.interceptor';

@Controller('metadata')
@SetMetadata('roles', ['user'])
export class MetadataController {
  @UseGuards(MetadataGuard)
  @UseInterceptors(MetadataInterceptor)
  @SetMetadata('roles', ['admin'])
  @Get()
  getHello() {
    return 'hello metadata';
  }
}
