import { Module } from '@nestjs/common';
import { ProfilesRepositoryService } from './profiles-repository.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from '../entities/profile.entity';
import { GetProfileByIdUseCase } from './use-cases/get-profile-by-id.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
  ],
  providers: [ProfilesRepositoryService, GetProfileByIdUseCase],
  exports: [ProfilesRepositoryService],
})
export class ProfilesRepositoryModule {}
