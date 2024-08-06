import { Injectable } from '@nestjs/common';
import { CreateMeetUseCase } from './use-cases/create-meet.usecase';
import { CreateMeetDto } from '../../meets/dto/create-meet.dto';
import { Meet } from '../entities/meet.entity';
import { GetNearbyMeetsUseCase } from './use-cases/get-nearby-meets.usecase';
import { GetMeetsDto } from '../../meets/dto/get-meets.dto';
import { GetMeetsByOwnerUseCase } from './use-cases/get-meets-by-owner.usecase';
import { GetMeetByIdUseCase } from './use-cases/get-meet-by-id.usecase';
import { CreateMeetMemberUseCase } from './use-cases/create-meet-member.usecase';
import { MeetMember, MeetMemberStatusEnum } from '../entities/meet-member';
import { UpdateMeetMemberStatusUseCase } from './use-cases/update-meet-member-status.usecase';
import { Profile } from '../entities/profile.entity';
import { GetMeetMemberUseCase } from './use-cases/get-meet-member.usecase';
import { GetMeetMembersUseCase } from './use-cases/get-meet-members.usecase';

@Injectable()
export class MeetsRepositoryService {
  constructor(
    private createMeetUseCase: CreateMeetUseCase,
    private getNearbyMeetsUseCase: GetNearbyMeetsUseCase,
    private getMeetsByOwnerUseCase: GetMeetsByOwnerUseCase,
    private getMeetByIdUseCase: GetMeetByIdUseCase,
    private createMeetMemberUseCase: CreateMeetMemberUseCase,
    private updateMeetMemberStatusUseCase: UpdateMeetMemberStatusUseCase,
    private getMeetMemberUseCase: GetMeetMemberUseCase,
    private getMeetMembersUseCase: GetMeetMembersUseCase,
  ) {}

  async create(profile: Profile, createMeetDto: CreateMeetDto): Promise<Meet> {
    return this.createMeetUseCase.exec(profile, createMeetDto);
  }

  async getNearby(getMeetsDto: GetMeetsDto) {
    return this.getNearbyMeetsUseCase.exec(getMeetsDto);
  }

  async getByOwner(owner: Profile): Promise<Meet[]> {
    return this.getMeetsByOwnerUseCase.exec(owner);
  }

  async getById(id: string): Promise<Meet> {
    return this.getMeetByIdUseCase.exec(id);
  }

  async createMember(profile: Profile, meet: Meet): Promise<MeetMember> {
    return this.createMeetMemberUseCase.exec(profile, meet);
  }

  async updateMember(
    meetMember: MeetMember,
    status: MeetMemberStatusEnum,
  ): Promise<MeetMember> {
    return this.updateMeetMemberStatusUseCase.exec(meetMember, status);
  }

  async getMeetMember(meetId: string, profileId: string): Promise<MeetMember> {
    return this.getMeetMemberUseCase.exec(meetId, profileId);
  }

  async getMeetMembers(meetId: string): Promise<MeetMember[]> {
    return this.getMeetMembersUseCase.exec(meetId);
  }
}
