import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entities';
import { CreateCoffeeDto } from './dto/createCoffeeDto';
import { UpdateCoffeeDto } from './dto/updateCoffeeDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flavor } from './entities/flavor.entity/flavor.entity';

console.log(CreateCoffeeDto);

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  find() {
    return this.coffeeRepository.find({ relations: ['flavors'] });
  }

  async getById(id) {
    const item = await this.coffeeRepository.findOne({
      where: { id },
      relations: ['flavors'],
    });
    if (!item) {
      throw new NotFoundException(`${id} is not found`);
    }
    return item;
  }

  async create(dto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      dto.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    const coffee = this.coffeeRepository.create({ ...dto, flavors });
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, dto: UpdateCoffeeDto) {
    const flavors =
      dto.flavors &&
      (await Promise.all(
        dto.flavors.map((name) => this.preloadFlavorByName(name)),
      ));

    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...dto,
      flavors,
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

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
}
