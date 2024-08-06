import { InjectModel } from '@nestjs/mongoose';
import { Meet } from '../../entities/meet.entity';
import { FilterQuery, Model } from 'mongoose';
import { GetMeetsDto } from '../../../meets/dto/get-meets.dto';

export class GetNearbyMeetsUseCase {
  constructor(@InjectModel(Meet.name) private meetModel: Model<Meet>) {}

  private composeFindOptions({
    owner,
    longitude,
    latitude,
    radius,
  }: GetMeetsDto): FilterQuery<Meet> {
    const filterQuery: FilterQuery<Meet> = {
      owner,
    };

    if (!!longitude && !!latitude && !!radius) {
      filterQuery.location = {
        $geoWithin: {
          $centerSphere: [[longitude, latitude], radius / 6371000],
        },
      };
    }

    return filterQuery;
  }

  async exec(getMeetsDto: GetMeetsDto) {
    const meets = await this.meetModel.find(
      this.composeFindOptions(getMeetsDto),
    );

    return meets.map((meet) => meet.toObject());
  }
}
