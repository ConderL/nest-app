import { Global, Module, forwardRef } from '@nestjs/common';
import { CoffeeController } from './coffee.controller';

import { CoffeeService } from './coffee.service';
import { Coffee } from './entities/coffee.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity/flavor.entity';
import { PersonModule } from 'src/person/person.module';

@Global() // 全局模块, 尽量少用, 会降低代码的可维护性
@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor]),
    forwardRef(() => PersonModule), // 处理循环引用
  ],
  controllers: [CoffeeController],
  providers: [CoffeeService],
  exports: [CoffeeService],
})
export class CoffeeModule {}
