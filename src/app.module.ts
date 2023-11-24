import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LucasController } from './lucas/lucas.controller';

@Module({
  imports: [],
  controllers: [AppController, LucasController],
  providers: [AppService],
})
export class AppModule {}
