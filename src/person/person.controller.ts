import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  Body,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreatePersonDto } from './dto/create-person.dto';

@Controller('/person')
export class PersonController {
  @Get()
  getPerson(@Query() name) {
    return name;
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
    console.log(createPersonDto);

    console.log(files);
    return `received: ${JSON.stringify(createPersonDto)}`;
  }
}
