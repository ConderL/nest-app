import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  Body,
  UploadedFiles,
  Query,
  Inject,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreatePersonDto } from './dto/create-person.dto';
import { PersonService } from './person.service';

@Controller('/person')
export class PersonController {
  constructor(
    @Inject('person_service') private readonly personService: PersonService, // 构造函数注入
  ) {}

  // 属性注入
  @Inject('admin')
  private readonly admin: { name: string; age: number };

  @Inject('factory')
  private readonly factory: { brand: string };

  @Get()
  getPerson(@Query() name) {
    return {
      name: this.personService.getName(name),
      admin: this.admin,
      factory: this.factory,
    };
  }

  @Post('file')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads/',
    }),
  )
  body2(
    @Body() createPersonDto: CreatePersonDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(files);
    return `received: ${JSON.stringify(createPersonDto)}`;
  }
}
