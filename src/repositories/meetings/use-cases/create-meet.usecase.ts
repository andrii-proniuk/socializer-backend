import { InjectModel } from '@nestjs/mongoose';
import { Meet } from '../../entities/meet.entity';
import { Model } from 'mongoose';
import { CreateMeetDto } from '../../../meets/dto/create-meet.dto';
import { Profile } from '../../entities/profile.entity';

export class CreateMeetUseCase {
  constructor(@InjectModel(Meet.name) private meetModel: Model<Meet>) {}

  async exec(
    profile: Profile,
    {
      name,
      description,
      location: { longitude, latitude },
      startAt: startDateTime,
    }: CreateMeetDto,
  ): Promise<Meet> {
    const meet = await this.meetModel.create({
      owner: profile.id,
      name,
      description,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
      startAt: new Date(startDateTime),
    });

    meet.owner = profile;

    return meet.toObject();
  }
}
