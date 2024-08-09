import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MeetMember, MeetMemberStatusEnum } from '../../entities/meet-member';
import { Model } from 'mongoose';
import { Profile } from '../../entities/profile.entity';
import { Meet } from '../../entities/meet.entity';
import { MongooseDocument } from '../../../common/types/mongoose-document.type';

@Injectable()
export class CreateMeetMemberUseCase {
  constructor(
    @InjectModel(MeetMember.name) private meetMemberModel: Model<MeetMember>,
  ) {}

  async exec(
    profile: Profile,
    meet: Meet,
  ): Promise<MongooseDocument<MeetMember>> {
    let member = await this.meetMemberModel.findOne({
      profile: profile._id,
      meet: meet._id,
    });

    if (!member) {
      member = await this.meetMemberModel.create({
        profile,
        meet,
        status: MeetMemberStatusEnum.Pending,
      });
    } else {
      member.status = MeetMemberStatusEnum.Pending;
      member.markModified('status');
      await member.save();
    }

    member.profile = profile;
    member.meet = meet;

    return member;
  }
}
