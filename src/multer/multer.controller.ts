import {
  Body,
  Controller,
  FileTypeValidator,
  HttpException,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  AnyFilesInterceptor, // FileFieldsInterceptor
} from '@nestjs/platform-express';

import { storage } from '../tools';
// import { MyFileValidator } from './myFileValidator';
// import { FilesSizeValidationPipe } from './file-size-validation-pipe.pipe';

@Controller('multer')
export class MulterController {
  @Post()
  @UseInterceptors(
    // FileFieldsInterceptor(
    //   // 明确知道file字段
    //   [
    //     {
    //       name: 'upup',
    //       maxCount: 3,
    //     },
    //     {
    //       name: 'oo',
    //       maxCount: 2,
    //     },
    //   ],
    //   { dest: 'uploads' },
    // ),
    AnyFilesInterceptor({
      // dest: 'uploads',
      storage,
    }), // 不知道时使用
  )
  @Post('limit')
  uploadLimit(
    @UploadedFiles(
      //  FilesSizeValidationPipe
      new ParseFilePipe({
        exceptionFactory: (err) => {
          throw new HttpException('errorrrrrr ' + err, 404);
        },
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
          // new MyFileValidator({}) // 自定义校验
        ],
      }),
    )
    files: Express.Multer.File[],
    @Body() body,
  ) {
    console.log(files, 'file');
    console.log(body, 'body');
  }
}
