import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jwt-simple';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { UsersRepositoryService } from '../../repositories/users/users-repository.service';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  private accessSecret: string;

  constructor(
    configService: ConfigService,
    private usersRepositoryService: UsersRepositoryService,
  ) {
    this.accessSecret = configService.get<string>('jwt.accessSecret');
  }

  private getJwt(header: string): string {
    const [bearer, token] = header.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException();
    }

    return token;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const token = this.getJwt(authHeader);

    try {
      const payload: JwtPayload = jwt.decode(token, this.accessSecret);

      if (payload.exp * 1000 < Date.now()) {
        throw new Error();
      }

      req.user = await this.usersRepositoryService.getById(payload.id);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
