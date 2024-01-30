import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from './coffee/coffee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModule } from './person/person.module';
import { LogMiddleware } from './log.middleware';
// import { APP_FILTER } from '@nestjs/core';
// import { TestFilter } from './test.filter';
// import { APP_PIPE } from '@nestjs/core';
// import { ValidatePipe } from './validate.pipe';
// import { APP_INTERCEPTOR } from '@nestjs/core';
// import { TimeInterceptor } from './time.interceptor';
// import { APP_GUARD } from '@nestjs/core';
// import { LoginGuard } from './login.guard';
import { HostController } from './host/host.controller';
import { ExecutionContextModule } from './execution-context/execution-context.module';
import { CustomDecotorController } from './custom-decorator/aaa.controller';
import { MetadataController } from './metadata/metadata.controller';
import { MyDynamicModule } from './dynamic-module/dynamic.module';
import { Dynamic2Module } from './dynamic-module/dynamic2.module';
import { InterceptorModule } from './interceptor/interceptor.module';

@Module({
  imports: [
    PersonModule,
    CoffeeModule,
    ExecutionContextModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MyDynamicModule.register({ name: 'MyDynamicModule' }),
    Dynamic2Module.register({ aaa: 123, bbb: '456', isGlobal: false }),
    Dynamic2Module.registerAsync({
      useFactory: async () => {
        await 111;
        return {
          aaa: 111,
          bbb: '222',
        };
      },
      inject: [],
    }),
    InterceptorModule,
  ],
  controllers: [
    AppController,
    HostController,
    CustomDecotorController,
    MetadataController,
  ],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: LoginGuard,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TimeInterceptor,
    // },
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidatePipe,
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: TestFilter,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('person*');
  }
}
