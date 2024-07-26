import { Module } from '@nestjs/common';
import { UsersRepositoryService } from './users-repository.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../entities/user.entity';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { Profile, ProfileSchema } from '../entities/profile.entity';
import { GetUserUseCase } from './use-cases/get-user.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Profile.name, schema: ProfileSchema },
    ]),
  ],
  providers: [UsersRepositoryService, CreateUserUseCase, GetUserUseCase],
  exports: [UsersRepositoryService],
})
export class UsersRepositoryModule {}
