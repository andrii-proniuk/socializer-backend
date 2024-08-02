import { Type } from 'class-transformer';
import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber } from 'class-validator';

export class GetMeetsDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsLongitude()
  longitude: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsLatitude()
  latitude: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  radius: number;
}
