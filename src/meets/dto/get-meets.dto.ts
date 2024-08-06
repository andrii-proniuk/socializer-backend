import { Type } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  isNumberString,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class GetMeetsDto {
  @IsOptional()
  @Type(() => Number)
  @IsLongitude()
  @ValidateIf(
    (object) =>
      isNumberString(object.latitude) || isNumberString(object.radius),
  )
  longitude: number;

  @IsOptional()
  @Type(() => Number)
  @IsLatitude()
  @ValidateIf(
    (object) =>
      isNumberString(object.radius) || isNumberString(object.longitude),
  )
  latitude: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ValidateIf(
    (object) =>
      isNumberString(object.latitude) || isNumberString(object.longitude),
  )
  radius: number;

  @IsOptional()
  @IsString()
  owner: string;
}
