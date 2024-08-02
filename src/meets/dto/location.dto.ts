import { Type } from 'class-transformer';
import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';

export class LocationDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsLongitude()
  longitude: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsLatitude()
  latitude: number;
}
