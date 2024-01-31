import { Inject, Injectable } from '@nestjs/common';
import { CoffeeService } from './coffee/coffee.service';
import { MyLoggerModule } from './logger/MyLoggerModule';

@Injectable()
export class AppService {
  @Inject(CoffeeService)
  private coffeeService: CoffeeService;
  @Inject(MyLoggerModule)
  private logger: MyLoggerModule;

  getHello(): string {
    this.logger.log('llllllllll', AppService.name);
    return 'Hello Nest~';
  }
}
