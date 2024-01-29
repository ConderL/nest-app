import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  Body,
  UploadedFiles,
  Query,
  Inject,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  OnApplicationShutdown,
  BeforeApplicationShutdown,
  forwardRef,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreatePersonDto } from './dto/create-person.dto';
import { PersonService } from './person.service';
import { CoffeeService } from 'src/coffee/coffee.service';
import { log } from 'console';
import { TimeInterceptor } from 'src/time.interceptor';

@Controller('/person')
@UseInterceptors(TimeInterceptor)
export class PersonController
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(
    @Inject('person_service') private readonly personService: PersonService, // 构造函数注入
  ) {}

  // 属性注入
  @Inject('admin')
  private readonly admin: { name: string; age: number };

  @Inject('factory')
  private readonly factory: { brand: string };

  @Inject(forwardRef(() => CoffeeService))
  private readonly coffeeService: CoffeeService;

  onModuleInit() {
    log('person.controller onModuleInit');
  }

  onApplicationBootstrap() {
    log('person.controller onApplicationBootstrap');
  }

  onModuleDestroy() {
    log('person.controller onModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    log('person.controller beforeApplicationShutdown', signal);
  }

  onApplicationShutdown(signal?: string) {
    log('person.controller onApplicationShutdown', signal);
  }

  @Get()
  getPerson(@Query() name) {
    const coffee = this.coffeeService.find(name);
    return {
      name: this.personService.getName(name),
      admin: this.admin,
      factory: this.factory,
      coffee,
    };
  }

  @Post('file')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads/',
    }),
  )
  body2(
    @Body() createPersonDto: CreatePersonDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(files);
    return `received: ${JSON.stringify(createPersonDto)}`;
  }
}
