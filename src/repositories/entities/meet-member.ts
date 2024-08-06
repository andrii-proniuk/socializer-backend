import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Meet } from './meet.entity';
import { Profile } from './profile.entity';
import mongoose, { HydratedDocument } from 'mongoose';

export enum MeetMemberStatusEnum {
  Pending = 'pending',
  Accepted = 'accepted',
  Rejected = 'rejected',
  Kicked = 'kicked',
  Left = 'left',
}

@Schema({ timestamps: true, id: true })
export class MeetMember {
  id: string;
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Meet' })
  meet: Meet;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  profile: Profile;

  @Prop({ type: String, required: true })
  status: MeetMemberStatusEnum;

  createdAt: Date;
  updatedAt: Date;
}

export type MeetMemberDocument = HydratedDocument<MeetMember>;

export const MeetMemberSchema = SchemaFactory.createForClass(MeetMember);
