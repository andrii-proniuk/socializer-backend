import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { MeetsRepositoryService } from '../../repositories/meetings/meets-repository.service';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';
import { MeetMemberStatusEnum } from '../../repositories/entities/meet-member';

@Injectable()
export class ProfileCanJoinMeetGuard implements CanActivate {
  constructor(private meetsRepositoryService: MeetsRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    const { meet } = req.locals;

    const meetMember = await this.meetsRepositoryService.getMeetMember(
      meet.id,
      req.user.profile.id,
    );

    if (meetMember && meetMember.status !== MeetMemberStatusEnum.Left) {
      throw new ForbiddenException();
    }

    return true;
  }
}
