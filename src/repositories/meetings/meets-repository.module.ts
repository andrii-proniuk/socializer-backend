import { Module } from '@nestjs/common';
import { MeetsRepositoryService } from './meets-repository.service';
import { CreateMeetUseCase } from './use-cases/create-meet.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import { Meet, MeetSchema } from '../entities/meet.entity';
import { GetNearbyMeetsUseCase } from './use-cases/get-nearby-meets.usecase';
import { GetMeetsByOwnerUseCase } from './use-cases/get-meets-by-owner.usecase';
import { GetMeetByIdUseCase } from './use-cases/get-meet-by-id.usecase';
import { MeetMember, MeetMemberSchema } from '../entities/meet-member';
import { CreateMeetMemberUseCase } from './use-cases/create-meet-member.usecase';
import { UpdateMeetMemberStatusUseCase } from './use-cases/update-meet-member-status.usecase';
import { GetMeetMemberUseCase } from './use-cases/get-meet-member.usecase';
import { GetMeetMembersUseCase } from './use-cases/get-meet-members.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Meet.name, schema: MeetSchema },
      { name: MeetMember.name, schema: MeetMemberSchema },
    ]),
  ],
  providers: [
    MeetsRepositoryService,
    CreateMeetUseCase,
    GetNearbyMeetsUseCase,
    GetMeetsByOwnerUseCase,
    GetMeetByIdUseCase,
    CreateMeetMemberUseCase,
    UpdateMeetMemberStatusUseCase,
    GetMeetMemberUseCase,
    GetMeetMembersUseCase,
  ],
  exports: [MeetsRepositoryService],
})
export class MeetsRepositoryModule {}
