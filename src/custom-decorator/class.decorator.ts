import { Controller, SetMetadata, applyDecorators } from '@nestjs/common';

export const ClassDecorator = () => {
  return applyDecorators(
    Controller('custom-decorator'),
    SetMetadata('class', 'decorator'),
  );
};
