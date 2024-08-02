import { InjectModel } from '@nestjs/mongoose';
import { Meet } from '../../entities/meet.entity';
import { Model } from 'mongoose';
import { User } from '../../entities/user.entity';
import { GetMeetsDto } from '../../../meets/dto/get-meets.dto';

export class GetNearbyMeetsUseCase {
  constructor(@InjectModel(Meet.name) private meetModel: Model<Meet>) {}

  async exec(user: User, { longitude, latitude, radius }: GetMeetsDto) {
    const meets = await this.meetModel.find({
      // owner: user.id,
      location: {
        $geoWithin: {
          $centerSphere: [[longitude, latitude], radius / 6371000],
        },
      },
    });

    return meets.map((meet) => meet.toObject());
  }
}
