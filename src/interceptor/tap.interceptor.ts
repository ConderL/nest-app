import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { InterceptorService } from './interceptor.service';

@Injectable()
export class TapInterceptor implements NestInterceptor {
  constructor(private appService: InterceptorService) {}

  private readonly logger = new Logger(TapInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        // 这里是更新缓存的操作，这里模拟下
        this.appService.getHello();

        this.logger.log(`log something`, data);
      }),
    );
  }
}
