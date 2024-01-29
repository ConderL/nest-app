import {
  Module,
  OnApplicationBootstrap,
  OnModuleInit,
  OnModuleDestroy,
  OnApplicationShutdown,
  BeforeApplicationShutdown,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { ModuleRef } from '@nestjs/core';
import { CoffeeModule } from 'src/coffee/coffee.module';

const personProvider = {
  provide: 'person_service',
  useClass: PersonService,
};

@Module({
  // 局部模块
  imports: [forwardRef(() => CoffeeModule)],
  controllers: [PersonController],
  providers: [
    personProvider,
    {
      provide: 'admin',
      useValue: {
        name: 'conder',
        age: 18,
      },
    },
    {
      provide: 'factory',
      useFactory(personService) {
        return {
          brand: 'coffee',
          personService,
        };
      },
      inject: ['person_service'],
    },
    {
      provide: 'asyncFactory',
      async useFactory() {
        await new Promise((res) => setTimeout(res, 1000));
        return { a: 'a' };
      },
      useExisting: 'nickName', // 别名
    },
  ],
  exports: [personProvider],
})
export class PersonModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  @Inject(ModuleRef)
  private readonly moduleRef: ModuleRef;

  onModuleInit() {
    console.log('person.module onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('person.module onApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('person.module onModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('person.module beforeApplicationShutdown', signal);
  }

  onApplicationShutdown(signal?: string) {
    const personService = this.moduleRef.get<PersonService>('person_service');
    console.log('personService', personService.getName('moduleRef'));
    console.log('person.module onApplicationShutdown', signal);
  }
}
