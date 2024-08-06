import { InjectModel } from '@nestjs/mongoose';
import { Meet } from '../../entities/meet.entity';
import { Model } from 'mongoose';
import { Profile } from '../../entities/profile.entity';

export class GetMeetsByOwnerUseCase {
  constructor(@InjectModel(Meet.name) private meetModel: Model<Meet>) {}

  async exec(owner: Profile) {
    const meets = await this.meetModel.find({
      owner: owner._id,
    });

    return meets.map((meet) => {
      meet.owner = owner;

      return meet.toObject();
    });
  }
}
