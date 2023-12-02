import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entities';
import { CreateCoffeeDto } from './dto/createCoffeeDto';
import { UpdateCoffeeDto } from './dto/updateCoffeeDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  find() {
    return this.coffeeRepository.find();
  }

  async getById(id) {
    const item = await this.coffeeRepository.findOne(id);
    if (!item) {
      throw new NotFoundException(`${id} is not found`);
    }
    return item;
  }

  create(dto: CreateCoffeeDto) {
    const coffee = this.coffeeRepository.create(dto);
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, dto: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...dto,
    });

    if (!coffee) {
      throw new NotFoundException(`${id} is not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id) {
    const coffee = await this.coffeeRepository.findOne({ where: { id: id } });

    return this.coffeeRepository.remove(coffee);
  }
}
