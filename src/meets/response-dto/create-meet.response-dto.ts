import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateMeetResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description?: string;

  @Expose()
  location: object;

  @Expose()
  startDateTime: string;
}
