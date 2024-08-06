import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MeetMember } from '../../entities/meet-member';

@Injectable()
export class GetMeetMembersUseCase {
  constructor(
    @InjectModel(MeetMember.name) private meetMemberModel: Model<MeetMember>,
  ) {}

  async exec(meetId: string): Promise<MeetMember[]> {
    const meetMembers = await this.meetMemberModel
      .find({
        meet: meetId,
      })
      .populate({
        path: 'meet',
        populate: {
          path: 'owner',
          model: 'profile',
        },
      });

    return meetMembers.map((member) => member.toObject());
  }
}
