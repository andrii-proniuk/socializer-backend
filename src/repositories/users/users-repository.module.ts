import { Global, Module } from '@nestjs/common';
import { UsersRepositoryService } from './users-repository.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../entities/user.entity';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { Profile, ProfileSchema } from '../entities/profile.entity';
import { GetUserUseCase } from './use-cases/get-user.usecase';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.usecase';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Profile.name, schema: ProfileSchema },
    ]),
  ],
  providers: [
    UsersRepositoryService,
    CreateUserUseCase,
    GetUserUseCase,
    GetUserByIdUseCase,
  ],
  exports: [UsersRepositoryService],
})
export class UsersRepositoryModule {}
