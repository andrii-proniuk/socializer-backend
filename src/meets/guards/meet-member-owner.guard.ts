import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';

@Injectable()
export class MeetMemberOwnerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    const { meetMember } = req.locals;

    if (!req.user.profile._id.equals(meetMember.profile._id)) {
      throw new ForbiddenException({
        message: 'Not a meet member owner',
      });
    }

    return true;
  }
}
