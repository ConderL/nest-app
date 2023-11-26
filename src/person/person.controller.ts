import {
  Controller,
  Post,
  UseInterceptors,
  Body,
  UploadedFiles,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreatePersonDto } from './dto/create-person.dto';

@Controller('/person')
export class PersonController {
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
