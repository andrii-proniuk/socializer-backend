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
import {
  SuccessResponseDto,
  SuccessResponseDtoParams,
} from '../common/response-dto/success.response-dto';
import {
  SuccessPaginatedResponseDto,
  SuccessPaginatedResponseDtoParams,
} from '../common/response-dto/success-paginated.response-dto';
import { GetMeetMembersDto } from './dto/get-meet-members.dto';

@Injectable()
export class MeetsService {
  constructor(private meetsRepositoryService: MeetsRepositoryService) {}

  async create(
    profile: Profile,
    createMeetDto: CreateMeetDto,
  ): Promise<SuccessResponseDto<CreateMeetResponseDto>> {
    const meet = await this.meetsRepositoryService.create(
      profile,
      createMeetDto,
    );

    return plainToInstance(SuccessResponseDto<CreateMeetResponseDto>, {
      type: CreateMeetResponseDto,
      data: meet,
    });
  }

  async getNearby(getMeetsDto: GetMeetsDto) {
    const meets = await this.meetsRepositoryService.getNearby(getMeetsDto);

    return plainToInstance<
      SuccessPaginatedResponseDto<GetMeetResponseDto>,
      SuccessPaginatedResponseDtoParams
    >(SuccessPaginatedResponseDto<GetMeetResponseDto>, {
      type: GetMeetResponseDto,
      data: meets,
      pagination: getMeetsDto,
    });
  }

  async getById(id: string): Promise<SuccessResponseDto<GetMeetResponseDto>> {
    const meet = await this.meetsRepositoryService.getById(id);

    return plainToInstance<
      SuccessResponseDto<GetMeetResponseDto>,
      SuccessResponseDtoParams
    >(SuccessResponseDto<GetMeetResponseDto>, {
      type: GetMeetResponseDto,
      data: meet,
    });
  }

  async joinMeet(profile: Profile, meet: Meet) {
    const member = await this.meetsRepositoryService.createMember(
      profile,
      meet,
    );

    return plainToInstance<
      SuccessResponseDto<GetMeetMemberResponseDto>,
      SuccessResponseDtoParams
    >(SuccessResponseDto<GetMeetMemberResponseDto>, {
      type: GetMeetMemberResponseDto,
      data: member,
    });
  }

  async acceptMember(member: MeetMember) {
    const updatedMember = await this.meetsRepositoryService.updateMember(
      member,
      MeetMemberStatusEnum.Accepted,
    );

    return plainToInstance<
      SuccessResponseDto<GetMeetMemberResponseDto>,
      SuccessResponseDtoParams
    >(SuccessResponseDto<GetMeetMemberResponseDto>, {
      type: GetMeetMemberResponseDto,
      data: updatedMember,
    });
  }

  async rejectMember(member: MeetMember) {
    const updatedMember = await this.meetsRepositoryService.updateMember(
      member,
      MeetMemberStatusEnum.Rejected,
    );

    return plainToInstance<
      SuccessResponseDto<GetMeetMemberResponseDto>,
      SuccessResponseDtoParams
    >(SuccessResponseDto<GetMeetMemberResponseDto>, {
      type: GetMeetMemberResponseDto,
      data: updatedMember,
    });
  }

  async kickMember(member: MeetMember) {
    const updatedMember = await this.meetsRepositoryService.updateMember(
      member,
      MeetMemberStatusEnum.Kicked,
    );

    return plainToInstance<
      SuccessResponseDto<GetMeetMemberResponseDto>,
      SuccessResponseDtoParams
    >(SuccessResponseDto<GetMeetMemberResponseDto>, {
      type: GetMeetMemberResponseDto,
      data: updatedMember,
    });
  }

  async leaveMeet(member: MeetMember) {
    const updatedMember = await this.meetsRepositoryService.updateMember(
      member,
      MeetMemberStatusEnum.Left,
    );

    return plainToInstance<
      SuccessResponseDto<GetMeetMemberResponseDto>,
      SuccessResponseDtoParams
    >(SuccessResponseDto<GetMeetMemberResponseDto>, {
      type: GetMeetMemberResponseDto,
      data: updatedMember,
    });
  }

  async getMembers(
    profile: Profile,
    meet: Meet,
    getMeetMembersDto: GetMeetMembersDto,
  ) {
    const isMeetOwner = profile._id.toString() === meet.owner._id.toString();

    const meetMembers = await this.meetsRepositoryService.getMeetMembers(
      meet._id,
      getMeetMembersDto,
      isMeetOwner,
    );

    return plainToInstance<
      SuccessPaginatedResponseDto<GetMeetMemberResponseDto>,
      SuccessPaginatedResponseDtoParams
    >(SuccessPaginatedResponseDto<GetMeetMemberResponseDto>, {
      type: GetMeetMemberResponseDto,
      data: meetMembers,
      pagination: getMeetMembersDto,
    });
  }
}
