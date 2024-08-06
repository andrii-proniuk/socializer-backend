import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from '../../entities/profile.entity';
import { Model } from 'mongoose';

@Injectable()
export class GetProfileByIdUseCase {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async exec(id: string): Promise<Profile> {
    const profile = await this.profileModel.findOne({
      _id: id,
    });

    return profile.toObject();
  }
}