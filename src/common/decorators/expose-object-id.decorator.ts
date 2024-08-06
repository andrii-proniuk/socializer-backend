import { applyDecorators } from '@nestjs/common';
import { Expose } from 'class-transformer';

export const ExposeObjectId = (name = '_id') =>
  applyDecorators(Expose({ name }));
