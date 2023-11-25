import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  // Res,
  Patch,
  Delete,
  // Query,
} from '@nestjs/common';

import { CoffeeService } from './coffee.service';
import { CreateCoffeeDto } from './dto/createCoffeeDto';
import { UpdateCoffeeDto } from './dto/updateCoffeeDto';

@Controller('coffee')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  //   @Get()
  //   findAll(@Query() paginationQuery) {
  //     const { limit, offset } = paginationQuery;
  //     return `The limit is ${limit}, offset is ${offset}`;
  //   }

  @Get()
  find() {
    return this.coffeeService.find();
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
  getById(@Param('id') id: string) {
    return this.coffeeService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.GONE)
  create(@Body() coffeeDto: CreateCoffeeDto) {
    console.log(coffeeDto instanceof CreateCoffeeDto);

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