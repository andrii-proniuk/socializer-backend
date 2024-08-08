import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MeetMember } from '../../entities/meet-member';
import { MongooseDocument } from '../../../common/types/mongoose-document.type';

@Injectable()
export class GetMeetMemberUseCase {
  constructor(
    @InjectModel(MeetMember.name) private meetMemberModel: Model<MeetMember>,
  ) {}

  async exec(
    meetId: string,
    profileId: string,
  ): Promise<MongooseDocument<MeetMember>> {
    const meetMember = await this.meetMemberModel
      .findOne({
        meet: meetId,
        profile: profileId,
      })
      .populate({
        path: 'meet',
        populate: {
          path: 'owner',
          model: 'Profile',
        },
      });

    return meetMember;
  }
}
