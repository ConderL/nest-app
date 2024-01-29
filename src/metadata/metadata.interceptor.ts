import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class MetadataInterceptor implements NestInterceptor {
  @Inject(Reflector)
  private reflector: Reflector;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const roles = this.reflector.get('roles', context.getHandler());

    console.log(roles);
    console.log(
      'getAll',
      this.reflector.getAll('roles', [
        context.getHandler(),
        context.getClass(),
      ]),
    );
    console.log(
      'getAllAndMerge',
      this.reflector.getAllAndMerge('roles', [
        context.getHandler(),
        context.getClass(),
      ]),
    );
    console.log(
      'getAllAndOverride', // 获取第一个匹配到的
      this.reflector.getAllAndOverride('roles', [
        context.getHandler(),
        context.getClass(),
      ]),
    );

    return next.handle();
  }
}
