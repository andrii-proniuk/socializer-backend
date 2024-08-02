import { Module } from '@nestjs/common';
import { MeetsRepositoryService } from './meets-repository.service';
import { CreateMeetUseCase } from './use-cases/create-meet.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import { Meet, MeetSchema } from '../entities/meet.entity';
import { GetNearbyMeetsUseCase } from './use-cases/get-nearby-meets.usecase';
import { GetMeetsByOwnerUseCase } from './use-cases/get-meets-by-owner.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Meet.name, schema: MeetSchema }]),
  ],
  providers: [
    MeetsRepositoryService,
    CreateMeetUseCase,
    GetNearbyMeetsUseCase,
    GetMeetsByOwnerUseCase,
  ],
  exports: [MeetsRepositoryService],
})
export class MeetsRepositoryModule {}
