import { Controller, Get, Logger } from '@nestjs/common';

@Controller('logger')
export class LoggerController {
  private logger = new Logger();

  @Get()
  getHello(): string {
    this.logger.debug('aaa', LoggerController.name);
    this.logger.error('bbb', LoggerController.name);
    this.logger.log('ccc', LoggerController.name);
    this.logger.verbose('ddd', LoggerController.name);
    this.logger.warn('eee', LoggerController.name);

    return 'hello logger';
  }
}
