import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MeetsRepositoryService } from '../../repositories/meetings/meets-repository.service';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';

@Injectable()
export class MeetExistsGuard implements CanActivate {
  constructor(private meetsRepositoryService: MeetsRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    const { id } = req.params;

    const meet = await this.meetsRepositoryService.getById(id);

    if (!meet) {
      throw new NotFoundException();
    }

    req.locals = {
      ...req.locals,
      meet,
    };

    return true;
  }
}
