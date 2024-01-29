import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  forwardRef,
  // Res,
  Patch,
  Delete,
  Query,
  Inject,
  // Query,
} from '@nestjs/common';

import { CoffeeService } from './coffee.service';
import { CreateCoffeeDto } from './dto/createCoffeeDto';
import { UpdateCoffeeDto } from './dto/updateCoffeeDto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { PersonService } from 'src/person/person.service';

@Controller('coffee')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Inject(forwardRef(() => PersonService))
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeeService.find(paginationQuery);
  }

  //   @Get()
  //   getAll(@Res() response) {
  //     response.status(HttpStatus.ACCEPTED).send('success~');
  //   }

  @Get('say')
  getSay() {
    return '哈哈哈';
  }

  @Get(':id')
  getById(@Param('id') id: string, @Query() query: Record<string, any>) {
    console.log(query);
    return this.coffeeService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.GONE)
  create(@Body() coffeeDto: CreateCoffeeDto) {
    return this.coffeeService.create(coffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() coffeeDto: UpdateCoffeeDto) {
    return this.coffeeService.update(id, coffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeeService.remove(id);
  }
}
