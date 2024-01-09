import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request, Response, NextFunction } from 'express';
// import { TestFilter } from './test.filter';
// import { ValidatePipe } from './validate.pipe';
// import { TimeInterceptor } from './time.interceptor';
// import { LoginGuard } from './login.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('before', req.url);
    next();
    console.log('after', res.statusCode);
  });

  // 全局守卫
  // app.useGlobalGuards(new LoginGuard());

  // 全局拦截
  // app.useGlobalInterceptors(new TimeInterceptor());

  // 全局验证
  // app.useGlobalPipes(new ValidatePipe());

  // 全局过滤
  // app.useGlobalFilters(new TestFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useStaticAssets('public', { prefix: '/static' });
  await app.listen(9527);

  // 测试销毁时的生命周期
  // setTimeout(() => {
  //   app.close();
  // }, 3000);
}
bootstrap();
