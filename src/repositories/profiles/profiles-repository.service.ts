import { Injectable } from '@nestjs/common';
import { GetProfileByIdUseCase } from './use-cases/get-profile-by-id.usecase';
import { Profile } from '../entities/profile.entity';
import { MongooseDocument } from '../../common/types/mongoose-document.type';

@Injectable()
export class ProfilesRepositoryService {
  constructor(private getProfileByIdUseCase: GetProfileByIdUseCase) {}

  async getById(id: string): Promise<MongooseDocument<Profile>> {
    return this.getProfileByIdUseCase.exec(id);
  }
}
