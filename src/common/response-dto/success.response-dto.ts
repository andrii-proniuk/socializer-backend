import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { MongooseDocument } from '../types/mongoose-document.type';

export interface SuccessResponseDtoParams {
  type: any;
  data: MongooseDocument<object>;
  additionalData?: object;
}

@Exclude()
export class SuccessResponseDto<T> {
  @Expose()
  @Transform(({ obj, value }) => {
    return { ...value, ...obj.additionalData };
  })
  @Type(({ object }) => object.type)
  data: T;
}
