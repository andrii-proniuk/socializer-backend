import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';

@Injectable()
export class MeetNotStartedGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    const meet = req.locals.meet || req.locals.meetMember.meet;

    if (meet.startAt < new Date()) {
      throw new BadRequestException({
        message: 'Meet already started',
      });
    }

    return true;
  }
}
