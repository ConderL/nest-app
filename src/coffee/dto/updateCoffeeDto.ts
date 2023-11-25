import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeDto } from './createCoffeeDto';

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
