import { Injectable } from '@nestjs/common';
import { GetProfileByIdUseCase } from './use-cases/get-profile-by-id.usecase';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class ProfilesRepositoryService {
  constructor(private getProfileByIdUseCase: GetProfileByIdUseCase) {}

  async getById(id: string): Promise<Profile> {
    return this.getProfileByIdUseCase.exec(id);
  }
}
