import { Exclude, Expose } from 'class-transformer';
import { ExposeObjectId } from '../../common/decorators/expose-object-id.decorator';

@Exclude()
export class SignUpResponseDto {
  @ExposeObjectId()
  id: string;

  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
