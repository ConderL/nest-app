import { Inject, Injectable, LoggerService, forwardRef } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Injectable()
export class MyLogger implements LoggerService {
  @Inject(forwardRef(() => AppService))
  private readonly app: AppService;

  log(message: string, context: string) {
    console.log(`---log---[${context}]---`, message);
    // console.log(this.app.getHello());
  }

  error(message: string, context: string) {
    console.log(`---error---[${context}]---`, message);
  }

  warn(message: string, context: string) {
    console.log(`---warn---[${context}]---`, message);
  }
}
