import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from './coffee/coffee.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonController } from './person/person.controller';

@Module({
  imports: [
    CoffeeModule,
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'pass123',
    //   database: 'postgres',
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
  ],
  controllers: [AppController, PersonController],
  providers: [AppService],
})
export class AppModule {}
