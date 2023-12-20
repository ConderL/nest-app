import { Inject, Injectable } from '@nestjs/common';
import { CoffeeService } from './coffee/coffee.service';

@Injectable()
export class AppService {
  @Inject(CoffeeService)
  private coffeeService: CoffeeService;

  getHello(): string {
    return 'Hello Nest~';
  }
}
