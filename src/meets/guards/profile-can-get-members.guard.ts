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
export class MeetExistsGuard implements CanActivate {
  constructor(private meetsRepositoryService: MeetsRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    const { meet } = req.locals;

    if (meet.owner._id === req.user.profile._id.toString()) {
      return true;
    }

    const meetMember = await this.meetsRepositoryService.getMeetMember(
      meet._id,
      req.user.profile._id,
    );

    if (!meetMember || meetMember.status !== MeetMemberStatusEnum.Accepted) {
      throw new ForbiddenException();
    }

    return true;
  }
}
