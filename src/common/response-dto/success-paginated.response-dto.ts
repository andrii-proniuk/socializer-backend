import {
  Exclude,
  Expose,
  plainToInstance,
  Transform,
  Type,
} from 'class-transformer';
import { PaginationDto } from '../dto/pagination.dto';
import { initCustomTransform } from '../decorators/custom-transform.decorator';
import { MongooseDocument } from '../types/mongoose-document.type';

export interface SuccessPaginatedResponseDtoParams {
  type: any;
  data: MongooseDocument<object>[];
  pagination: PaginationDto;
}

const CustomTransform =
  initCustomTransform<SuccessPaginatedResponseDtoParams>();

@Exclude()
class Metadata {
  @Expose()
  @CustomTransform(({ obj }) => {
    return obj.data.length - obj.pagination.limit > 0;
  })
  hasNextPage: boolean;
}

@Exclude()
export class SuccessPaginatedResponseDto<T> {
  @Expose()
  @Type(({ object }) => object.type)
  data: T[];

  @Expose()
  @Transform(({ obj }) => {
    return plainToInstance(Metadata, obj);
  })
  meta: Metadata;
}
