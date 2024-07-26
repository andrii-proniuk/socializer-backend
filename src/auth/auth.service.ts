import { Injectable } from '@nestjs/common';
import { UsersRepositoryService } from '../repositories/users/users-repository.service';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(private usersRepositoryService: UsersRepositoryService) {}

  async signUp(signUpDto: SignUpDto) {
    return this.usersRepositoryService.create(signUpDto);
  }
}
