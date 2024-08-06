import { applyDecorators } from '@nestjs/common';
import { Expose, Transform } from 'class-transformer';

export const ExposeObjectIdFromEntity = (property: string) =>
  applyDecorators(
    Expose(),
    Transform(({ obj }) => {
      if (!obj[property]) {
        return null;
      }

      return typeof obj[property] === 'object'
        ? obj[property]._id
        : obj[property];
    }),
  );
