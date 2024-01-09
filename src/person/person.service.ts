import {
  Injectable,
  OnApplicationBootstrap,
  OnModuleInit,
  OnModuleDestroy,
  OnApplicationShutdown,
  BeforeApplicationShutdown,
} from '@nestjs/common';

@Injectable()
export class PersonService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleInit() {
    console.log('person.service onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('person.service onApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('person.service onModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('person.service beforeApplicationShutdown', signal);
  }

  onApplicationShutdown(signal?: string) {
    console.log('person.service onApplicationShutdown', signal);
  }

  getName(name) {
    return name;
  }
}
