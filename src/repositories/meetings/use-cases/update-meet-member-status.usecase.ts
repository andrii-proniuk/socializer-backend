import { Injectable } from '@nestjs/common';
import { MeetMember, MeetMemberStatusEnum } from '../../entities/meet-member';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UpdateMeetMemberStatusUseCase {
  constructor(
    @InjectModel(MeetMember.name) private meetMemberModel: Model<MeetMember>,
  ) {}

  async exec(
    meetMember: MeetMember,
    status: MeetMemberStatusEnum,
  ): Promise<MeetMember> {
    await this.meetMemberModel.updateOne(
      {
        _id: meetMember.id,
      },
      {
        status,
      },
    );

    const updatedMeetMember = await this.meetMemberModel.findOne({
      _id: meetMember.id,
    });

    return updatedMeetMember.toObject();
  }
}
