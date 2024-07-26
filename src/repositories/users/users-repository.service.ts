import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { SignUpDto } from '../../auth/dto/sign-up.dto';
import { GetUserUseCase } from './use-cases/get-user.usecase';

@Injectable()
export class UsersRepositoryService {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase,
  ) {}

  async create(signUpDto: SignUpDto) {
    return this.createUserUseCase.exec(signUpDto);
  }

  async getByEmail(email: string) {
    return this.getUserUseCase.exec({ email });
  }
}
