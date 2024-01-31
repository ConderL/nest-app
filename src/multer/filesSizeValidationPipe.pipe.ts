import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class FilesSizeValidationPipe implements PipeTransform {
  transform(values: Express.Multer.File[]) {
    let filename;
    const isError = values.some((value) => {
      filename = value.originalname;
      return value.size > 10 * 1024;
    });
    if (isError) {
      throw new HttpException(`${filename}大于 10k`, HttpStatus.BAD_REQUEST);
    }
    return values;
  }
}
