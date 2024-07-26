import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { UsersRepositoryService } from '../../repositories/users/users-repository.service';
import { Request } from 'express';

@Injectable()
export class UniqueEmailGuard implements CanActivate {
  constructor(private usersRepositoryService: UsersRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    if (!req.body.email) {
      return true;
    }

    const user = await this.usersRepositoryService.getByEmail(req.body.email);

    if (user) {
      throw new BadRequestException({ message: 'Email already exists' });
    }

    return true;
  }
}
