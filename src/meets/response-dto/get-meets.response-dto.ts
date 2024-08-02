import { Exclude, Expose } from 'class-transformer';
import { ExposeObjectId } from '../../common/decorators/expose-object-id.decorator';

@Exclude()
export class GetMeetResponseDto {
  @ExposeObjectId()
  id: string;

  @Expose()
  location: any;

  @Expose()
  name: string;

  @Expose()
  description?: string;

  @Expose()
  startDateTime: string;
}
