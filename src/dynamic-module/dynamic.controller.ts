import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { DynamicService } from './dynamic.service';
import { CreateDynamicModuleDto } from './dto/create-dynamic-module.dto';
import { UpdateDynamicModuleDto } from './dto/update-dynamic-module.dto';

@Controller('dynamic-module')
export class DynamicController {
  constructor(private readonly dynamicService: DynamicService) {}

  @Inject('CONFIG_OPTIONS')
  private readonly configOptions: Record<string, any>;

  @Post()
  create(@Body() createDynamicModuleDto: CreateDynamicModuleDto) {
    return this.dynamicService.create(createDynamicModuleDto);
  }

  @Get()
  findAll() {
    return this.dynamicService.findAll();
  }

  @Get('name')
  getName() {
    return this.configOptions;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dynamicService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDynamicModuleDto: UpdateDynamicModuleDto,
  ) {
    return this.dynamicService.update(+id, updateDynamicModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dynamicService.remove(+id);
  }
}
