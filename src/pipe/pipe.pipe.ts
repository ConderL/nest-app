import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PipePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value, metadata); // { metatype: [Function: String], type: 'query', data: 'name' }
    return `aaa`;
  }
}
