import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepositoryModule } from '../repositories/users/users-repository.module';

@Module({
  imports: [UsersRepositoryModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
