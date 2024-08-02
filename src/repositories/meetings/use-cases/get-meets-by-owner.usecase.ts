import { InjectModel } from '@nestjs/mongoose';
import { Meet } from '../../entities/meet.entity';
import { Model } from 'mongoose';

export class GetMeetsByOwnerUseCase {
  constructor(@InjectModel(Meet.name) private meetModel: Model<Meet>) {}

  async exec(owner: string) {
    const meets = await this.meetModel.find({
      owner,
    });

    return meets.map((meet) => meet.toObject());
  }
}
