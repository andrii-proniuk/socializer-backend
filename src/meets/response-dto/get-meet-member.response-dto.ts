import { Exclude, Expose, Type } from 'class-transformer';
import { ExposeObjectId } from '../../common/decorators/expose-object-id.decorator';
import { ExposeObjectIdFromEntity } from '../../common/decorators/expose-object-id-from-entity.decorator';

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
export class GetMeetMemberResponseDto {
  @ExposeObjectId()
  id: string;

  @Expose()
  @Type(() => ProfileResponseDto)
  profile: ProfileResponseDto;

  @ExposeObjectIdFromEntity('meet')
  meetId: string;

  @Expose()
  status: string;
}
