import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SignUpResponseDto {
  @Expose()
  id: string;

  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
