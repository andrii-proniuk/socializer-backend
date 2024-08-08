import { InjectModel } from '@nestjs/mongoose';
import { Meet } from '../../entities/meet.entity';
import { Model } from 'mongoose';
import { Profile } from '../../entities/profile.entity';
import { MongooseDocument } from '../../../common/types/mongoose-document.type';

export class GetMeetsByOwnerUseCase {
  constructor(@InjectModel(Meet.name) private meetModel: Model<Meet>) {}

  async exec(owner: Profile): Promise<MongooseDocument<Meet>[]> {
    const meets = await this.meetModel.find({
      owner: owner._id,
    });

    return meets;
  }
}
