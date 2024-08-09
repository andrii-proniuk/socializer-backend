import { Injectable } from '@nestjs/common';
import { MeetMember, MeetMemberStatusEnum } from '../../entities/meet-member';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseDocument } from '../../../common/types/mongoose-document.type';

@Injectable()
export class UpdateMeetMemberStatusUseCase {
  constructor(
    @InjectModel(MeetMember.name) private meetMemberModel: Model<MeetMember>,
  ) {}

  async exec(
    meetMember: MeetMember,
    status: MeetMemberStatusEnum,
  ): Promise<MongooseDocument<MeetMember>> {
    await this.meetMemberModel.updateOne(
      {
        _id: meetMember._id,
      },
      {
        status,
      },
    );

    const updatedMeetMember = await this.meetMemberModel.findOne({
      _id: meetMember._id,
    });

    return updatedMeetMember;
  }
}
