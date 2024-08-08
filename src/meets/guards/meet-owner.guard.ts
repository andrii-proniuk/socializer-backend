import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';

@Injectable()
export class MeetOwnerGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    const { meetMember } = req.locals;

    if (!req.user.profile._id.equals(meetMember.meet.owner._id)) {
      throw new ForbiddenException();
    }

    return true;
  }
}
