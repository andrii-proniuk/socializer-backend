import { InjectModel } from '@nestjs/mongoose';
import { Meet } from '../../entities/meet.entity';
import { Model } from 'mongoose';
import { CreateMeetDto } from '../../../meets/dto/create-meet.dto';
import { Profile } from '../../entities/profile.entity';
import { MeetMember, MeetMemberStatusEnum } from '../../entities/meet-member';
import { MongooseDocument } from '../../../common/types/mongoose-document.type';

export class CreateMeetUseCase {
  constructor(
    @InjectModel(Meet.name) private meetModel: Model<Meet>,
    @InjectModel(MeetMember.name) private meetMember: Model<MeetMember>,
  ) {}

  async exec(
    profile: Profile,
    {
      name,
      description,
      location: { longitude, latitude },
      startAt: startDateTime,
    }: CreateMeetDto,
  ): Promise<MongooseDocument<Meet>> {
    const meet = await this.meetModel.create({
      owner: profile,
      name,
      description,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
      startAt: new Date(startDateTime),
    });

    meet.owner = profile;

    await this.meetMember.create({
      meet,
      profile,
      status: MeetMemberStatusEnum.Accepted,
    });

    return meet;
  }
}
