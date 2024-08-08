import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MeetMember, MeetMemberStatusEnum } from '../../entities/meet-member';
import { MongooseDocument } from '../../../common/types/mongoose-document.type';
import { GetMeetMembersDto } from '../../../meets/dto/get-meet-members.dto';

@Injectable()
export class GetMeetMembersUseCase {
  constructor(
    @InjectModel(MeetMember.name) private meetMemberModel: Model<MeetMember>,
  ) {}

  async exec(
    meetId: string,
    getMeetMembersDto: GetMeetMembersDto,
    isMeetOwner?: boolean,
  ): Promise<MongooseDocument<MeetMember>[]> {
    const meetMembers = await this.meetMemberModel
      .find(
        {
          meet: meetId,
          status: isMeetOwner
            ? {
                $in: [
                  MeetMemberStatusEnum.Pending,
                  MeetMemberStatusEnum.Accepted,
                ],
              }
            : MeetMemberStatusEnum.Accepted,
        },
        undefined,
        getMeetMembersDto.getPaginationOptions(),
      )
      .populate({
        path: 'meet',
        populate: {
          path: 'owner',
          model: 'Profile',
        },
      });

    return meetMembers;
  }
}
