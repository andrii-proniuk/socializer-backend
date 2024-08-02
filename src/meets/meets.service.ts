import { Injectable } from '@nestjs/common';
import { MeetsRepositoryService } from '../repositories/meetings/meets-repository.service';
import { CreateMeetResponseDto } from './response-dto/create-meet.response-dto';
import { User } from '../repositories/entities/user.entity';
import { CreateMeetDto } from './dto/create-meet.dto';
import { plainToInstance } from 'class-transformer';
import { GetMeetResponseDto } from './response-dto/get-meets.response-dto';
import { GetMeetsDto } from './dto/get-meets.dto';

@Injectable()
export class MeetsService {
  constructor(private meetsRepositoryService: MeetsRepositoryService) {}

  async create(
    user: User,
    createMeetDto: CreateMeetDto,
  ): Promise<CreateMeetResponseDto> {
    const meet = await this.meetsRepositoryService.create(user, createMeetDto);

    return plainToInstance(CreateMeetResponseDto, meet);
  }

  async getNearby(
    user: User,
    getMeetsDto: GetMeetsDto,
  ): Promise<GetMeetResponseDto[]> {
    const meets = await this.meetsRepositoryService.getNearby(
      user,
      getMeetsDto,
    );

    return plainToInstance(GetMeetResponseDto, meets);
  }

  async getByOwner(owner: string): Promise<GetMeetResponseDto[]> {
    const meets = await this.meetsRepositoryService.getByOwner(owner);

    return plainToInstance(GetMeetResponseDto, meets);
  }
}
