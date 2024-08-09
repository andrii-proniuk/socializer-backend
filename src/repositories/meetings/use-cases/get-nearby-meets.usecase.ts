import { InjectModel } from '@nestjs/mongoose';
import { Meet } from '../../entities/meet.entity';
import { FilterQuery, Model } from 'mongoose';
import { GetMeetsDto } from '../../../meets/dto/get-meets.dto';
import { MongooseDocument } from '../../../common/types/mongoose-document.type';

export class GetNearbyMeetsUseCase {
  constructor(@InjectModel(Meet.name) private meetModel: Model<Meet>) {}

  private composeFindOptions({
    owner,
    longitude,
    latitude,
    radius,
  }: GetMeetsDto): FilterQuery<Meet> {
    const filterQuery: FilterQuery<Meet> = {
      startAt: {
        $gt: new Date(),
      },
    };

    if (owner) {
      filterQuery.owner = owner;
    }

    if (!!longitude && !!latitude && !!radius) {
      filterQuery.location = {
        $near: {
          $geometry: { type: 'Point', coordinates: [longitude, latitude] },
          $maxDistance: radius,
        },
      };
    }

    return filterQuery;
  }

  async exec(getMeetsDto: GetMeetsDto): Promise<MongooseDocument<Meet>[]> {
    const meets = await this.meetModel
      .find(
        this.composeFindOptions(getMeetsDto),
        undefined,
        getMeetsDto.getPaginationOptions(),
      )
      .populate('owner');

    return meets;
  }
}
