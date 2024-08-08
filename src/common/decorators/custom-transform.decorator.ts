import { applyDecorators } from '@nestjs/common';
import { Transform, TransformFnParams } from 'class-transformer';

type CustomTransformFunc<T> = (
  params: Omit<TransformFnParams, 'obj'> & { obj: T },
) => any;

export const initCustomTransform =
  <T>() =>
  (func: CustomTransformFunc<T>) =>
    applyDecorators(Transform(func));
