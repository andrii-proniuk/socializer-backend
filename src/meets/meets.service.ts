import { Injectable } from '@nestjs/common';
import { MeetsRepositoryService } from '../repositories/meetings/meets-repository.service';
import { CreateMeetResponseDto } from './response-dto/create-meet.response-dto';
import { CreateMeetDto } from './dto/create-meet.dto';
import { plainToInstance } from 'class-transformer';
import { GetMeetResponseDto } from './response-dto/get-meets.response-dto';
import { GetMeetsDto } from './dto/get-meets.dto';
import { Profile } from '../repositories/entities/profile.entity';
import { Meet } from '../repositories/entities/meet.entity';
import { GetMeetMemberResponseDto } from './response-dto/get-meet-member.response-dto';
import {
  MeetMember,
  MeetMemberStatusEnum,
} from '../repositories/entities/meet-member';

@Injectable()
export class MeetsService {
  constructor(private meetsRepositoryService: MeetsRepositoryService) {}

  async create(
    profile: Profile,
    createMeetDto: CreateMeetDto,
  ): Promise<CreateMeetResponseDto> {
    const meet = await this.meetsRepositoryService.create(
      profile,
      createMeetDto,
    );

    return plainToInstance(CreateMeetResponseDto, meet);
  }

  async getNearby(getMeetsDto: GetMeetsDto): Promise<GetMeetResponseDto[]> {
    const meets = await this.meetsRepositoryService.getNearby(getMeetsDto);

    return plainToInstance(GetMeetResponseDto, meets);
  }

  async getById(id: string): Promise<GetMeetResponseDto> {
    const meet = await this.meetsRepositoryService.getById(id);

    return plainToInstance(GetMeetResponseDto, meet);
  }

  async createMember(
    profile: Profile,
    meet: Meet,
  ): Promise<GetMeetMemberResponseDto> {
    const member = await this.meetsRepositoryService.createMember(
      profile,
      meet,
    );

    return plainToInstance(GetMeetMemberResponseDto, member);
  }

  async acceptMember(member: MeetMember): Promise<GetMeetMemberResponseDto> {
    const updatedMember = await this.meetsRepositoryService.updateMember(
      member,
      MeetMemberStatusEnum.Accepted,
    );

    return plainToInstance(GetMeetMemberResponseDto, updatedMember);
  }

  async rejectMember(member: MeetMember): Promise<GetMeetMemberResponseDto> {
    const updatedMember = await this.meetsRepositoryService.updateMember(
      member,
      MeetMemberStatusEnum.Rejected,
    );

    return plainToInstance(GetMeetMemberResponseDto, updatedMember);
  }

  async kickMember(member: MeetMember): Promise<GetMeetMemberResponseDto> {
    const updatedMember = await this.meetsRepositoryService.updateMember(
      member,
      MeetMemberStatusEnum.Kicked,
    );

    return plainToInstance(GetMeetMemberResponseDto, updatedMember);
  }

  async leaveMeet(member: MeetMember): Promise<GetMeetMemberResponseDto> {
    const updatedMember = await this.meetsRepositoryService.updateMember(
      member,
      MeetMemberStatusEnum.Left,
    );

    return plainToInstance(GetMeetMemberResponseDto, updatedMember);
  }

  async getMembers(meetId: string): Promise<GetMeetMemberResponseDto[]> {
    const meetMembers =
      await this.meetsRepositoryService.getMeetMembers(meetId);

    return plainToInstance(GetMeetMemberResponseDto, meetMembers);
  }
}
