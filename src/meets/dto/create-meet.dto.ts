import {
  IsDateString,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { LocationDto } from './location.dto';
import { Type } from 'class-transformer';
import { MeetStartAtValidator } from '../validators/meet-start-at.validator';

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
  @Validate(MeetStartAtValidator)
  @IsDateString()
  startAt: string;
}
