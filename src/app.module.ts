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
import { PipeModule } from './pipe/pipe.module';
import { ExceptionModule } from './exception/exception.module';
import { MulterModule } from './multer/multer.module';
import { LargeFileModule } from './large-file/large-file.module';
import { LoggerModule } from './logger/logger.module';
import { MyLogger } from './logger/myLogger.service';
import { DynamicLoggerModule } from './logger/dynamicLogger';

import { WinstonModule } from './winston/winston.module';
import { transports, format } from 'winston';
import * as chalk from 'chalk';

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
    PipeModule,
    ExceptionModule,
    MulterModule,
    LargeFileModule,
    LoggerModule,
    DynamicLoggerModule.register({
      a: 1,
      b: 2,
    }),
    WinstonModule.forRoot({
      level: 'debug',
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.printf(({ context, level, message, time }) => {
              const appStr = chalk.green(`[NEST]`);
              const contextStr = chalk.yellow(`[${context}]`);

              return `${appStr} ${time} ${level} ${contextStr} ${message} `;
            }),
          ),
        }),
        new transports.File({
          format: format.combine(format.timestamp(), format.json()),
          filename: '111.log',
          dirname: 'log',
        }),
      ],
    }),
  ],
  controllers: [
    AppController,
    HostController,
    CustomDecotorController,
    MetadataController,
  ],
  providers: [
    AppService,
    MyLogger,
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
    // }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('person*');
  }
}
