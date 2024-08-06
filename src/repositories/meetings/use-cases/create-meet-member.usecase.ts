import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MeetMember, MeetMemberStatusEnum } from '../../entities/meet-member';
import { Model } from 'mongoose';
import { Profile } from '../../entities/profile.entity';
import { Meet } from '../../entities/meet.entity';

@Injectable()
export class CreateMeetMemberUseCase {
  constructor(
    @InjectModel(MeetMember.name) private meetMemberModel: Model<MeetMember>,
  ) {}

  async exec(profile: Profile, meet: Meet): Promise<MeetMember> {
    const member = await this.meetMemberModel.create({
      profile: profile._id,
      meet: meet._id,
      status: MeetMemberStatusEnum.Pending,
    });

    member.profile = profile;
    member.meet = meet;

    return member.toObject();
  }
}
