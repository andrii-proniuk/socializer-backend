import { Exclude, Expose, Type } from 'class-transformer';
import { ExposeObjectId } from '../../common/decorators/expose-object-id.decorator';

@Exclude()
class ProfileResponseDto {
  @ExposeObjectId()
  id: string;

  @Expose()
  name: string;

  @Expose()
  avatar?: string;
}

@Exclude()
class LocationDto {
  @Expose()
  type: string;

  @Expose()
  coordinates: number[];
}

@Exclude()
export class GetMeetResponseDto {
  @ExposeObjectId()
  id: string;

  @Expose()
  @Type(() => ProfileResponseDto)
  owner: ProfileResponseDto;

  @Expose()
  @Type(() => LocationDto)
  location: LocationDto;

  @Expose()
  name: string;

  @Expose()
  description?: string;

  @Expose()
  startAt: string;
}
