import { Injectable } from '@nestjs/common';
import { CreateMeetUseCase } from './use-cases/create-meet.usecase';
import { User } from '../entities/user.entity';
import { CreateMeetDto } from '../../meets/dto/create-meet.dto';
import { Meet } from '../entities/meet.entity';
import { GetNearbyMeetsUseCase } from './use-cases/get-nearby-meets.usecase';
import { GetMeetsDto } from '../../meets/dto/get-meets.dto';
import { GetMeetsByOwnerUseCase } from './use-cases/get-meets-by-owner.usecase';

@Injectable()
export class MeetsRepositoryService {
  constructor(
    private createMeetUseCase: CreateMeetUseCase,
    private getNearbyMeetsUseCase: GetNearbyMeetsUseCase,
    private getMeetsByOwnerUseCase: GetMeetsByOwnerUseCase,
  ) {}

  async create(user: User, createMeetDto: CreateMeetDto): Promise<Meet> {
    return this.createMeetUseCase.exec(user, createMeetDto);
  }

  async getNearby(user: User, getMeetsDto: GetMeetsDto) {
    return this.getNearbyMeetsUseCase.exec(user, getMeetsDto);
  }

  async getByOwner(owner: string) {
    return this.getMeetsByOwnerUseCase.exec(owner);
  }
}
