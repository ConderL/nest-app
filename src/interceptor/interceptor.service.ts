import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class InterceptorService {
  @Get()
  getHello() {
    return 'hello interceptor service';
  }
}
