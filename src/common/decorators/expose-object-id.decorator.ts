import { applyDecorators } from '@nestjs/common';
import { Expose } from 'class-transformer';

export const ExposeObjectId = () => applyDecorators(Expose({ name: '_id' }));
