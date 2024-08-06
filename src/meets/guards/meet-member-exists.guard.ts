import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MeetsRepositoryService } from '../../repositories/meetings/meets-repository.service';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';

@Injectable()
export class MeetMemberExistsGuard implements CanActivate {
  constructor(private meetsRepositoryService: MeetsRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    const { id } = req.params;
    const profileId = req.params.profileId || req.user.profile._id;

    const meetMember = await this.meetsRepositoryService.getMeetMember(
      id,
      profileId,
    );

    if (!meetMember) {
      throw new NotFoundException({
        message: 'Meet Member not found',
      });
    }

    req.locals = {
      ...req.locals,
      meetMember,
    };

    return true;
  }
}
