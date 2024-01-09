import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';

@Module({
  controllers: [PersonController],
  providers: [
    {
      provide: 'person_service',
      useClass: PersonService,
    },
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
})
export class PersonModule {}
