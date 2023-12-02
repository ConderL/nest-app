import { Module } from '@nestjs/common';
import { CoffeeController } from './coffee.controller';

import { CoffeeService } from './coffee.service';
import { Coffee } from './entities/coffee.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity/flavor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor])],
  controllers: [CoffeeController],
  providers: [CoffeeService],
})
export class CoffeeModule {}
