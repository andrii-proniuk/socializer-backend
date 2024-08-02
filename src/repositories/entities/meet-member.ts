import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Meet } from './meet.entity';
import { Profile } from './profile.entity';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, id: true })
export class MeetMember {
  id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Meet })
  meet: Meet;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Profile })
  profile: Profile;

  createdAt: Date;
  updatedAt: Date;
}

export type MeetMemberDocument = HydratedDocument<MeetMember>;

export const MeetMemberSchema = SchemaFactory.createForClass(MeetMember);
