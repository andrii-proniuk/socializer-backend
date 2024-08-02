import {
  IsDateString,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { LocationDto } from './location.dto';
import { Type } from 'class-transformer';

export class CreateMeetDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsObject()
  @Type(() => LocationDto)
  @ValidateNested()
  location: LocationDto;

  @IsNotEmpty()
  @IsDateString()
  startAt: string;
}
