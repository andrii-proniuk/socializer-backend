import { applyDecorators, BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import mongoose from 'mongoose';

export const IsObjectId = applyDecorators(
  Transform(({ value }) => {
    const isValidObjectId = mongoose.isValidObjectId(value);

    if (!isValidObjectId) {
      throw new BadRequestException({ message: 'Invalid ObjectId' });
    }

    return value;
  }),
);
