import { InjectModel } from '@nestjs/mongoose';
import { Meet } from '../../entities/meet.entity';
import { Model } from 'mongoose';
import { CreateMeetDto } from '../../../meets/dto/create-meet.dto';
import { User } from '../../entities/user.entity';

export class CreateMeetUseCase {
  constructor(@InjectModel(Meet.name) private meetModel: Model<Meet>) {}

  async exec(
    user: User,
    {
      name,
      description,
      location: { longitude, latitude },
      startAt: startDateTime,
    }: CreateMeetDto,
  ): Promise<Meet> {
    const meet = await this.meetModel.create({
      owner: user.id,
      name,
      description,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
      startAt: new Date(startDateTime),
    });

    return meet.toObject();
  }
}
