import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { MeetsRepositoryService } from '../../repositories/meetings/meets-repository.service';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';

@Injectable()
export class MeetMemberIsNotExistsGuard implements CanActivate {
  constructor(private meetsRepositoryService: MeetsRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    const { id } = req.params;
    const profileId = req.params.profileId || req.user.profile.id;

    const meetMember = await this.meetsRepositoryService.getMeetMember(
      id,
      profileId,
    );

    if (meetMember) {
      throw new BadRequestException({
        message: 'Meet Member already exists',
      });
    }

    return true;
  }
}
