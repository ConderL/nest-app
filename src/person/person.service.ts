import { Injectable } from '@nestjs/common';

@Injectable()
export class PersonService {
  getName(name) {
    return name;
  }
}
