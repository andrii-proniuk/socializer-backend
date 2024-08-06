import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';
import { ProfilesRepositoryService } from '../../repositories/profiles/profiles-repository.service';

@Injectable()
export class ProfileExistsGuard implements CanActivate {
  constructor(private profilesRepositoryService: ProfilesRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    const { profileId } = req.params;

    const profile = await this.profilesRepositoryService.getById(profileId);

    if (!profile) {
      throw new NotFoundException();
    }

    req.locals = {
      ...req.locals,
      profile,
    };

    return true;
  }
}
