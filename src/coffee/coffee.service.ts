import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entities';

@Injectable()
export class CoffeeService {
  private coffee: Coffee[] = [
    {
      id: 1,
      name: 'Coffee',
      brand: 'pubg',
      flavors: ['sleep', 'brave'],
    },
  ];

  find() {
    return this.coffee;
  }

  getById(id) {
    const item = this.coffee.find((item) => item.id == id);
    if (!item) {
      throw new NotFoundException(`${id} is not found`);
    }
    return item;
  }

  create(dto) {
    this.coffee.push(dto);
    return dto;
  }

  update(id, dto) {
    const index = this.coffee.findIndex(id);
    if (index !== -1) {
      this.coffee.splice(index, 1, { ...this.coffee[index], ...dto });
    }
  }

  remove(id) {
    return this.update(id, null);
  }
}
