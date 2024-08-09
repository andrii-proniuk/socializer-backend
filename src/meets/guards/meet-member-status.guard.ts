import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';
import { Reflector } from '@nestjs/core';
import { CheckMeetMemberStatus } from '../decorators/check-meet-member-status.decorator';

@Injectable()
export class MeetMemberStatusGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();
    const status = this.reflector.get<string>(
      CheckMeetMemberStatus,
      context.getHandler(),
    );

    const { meetMember } = req.locals;

    if (meetMember.status !== status) {
      throw new BadRequestException({
        message: `meet member must have status "${status}"`,
      });
    }

    return true;
  }
}
