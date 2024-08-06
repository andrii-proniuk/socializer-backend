import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.entity';

@Schema({ timestamps: true, id: true })
export class Profile {
  id: string;
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: [String] })
  photos: string[];

  @Prop()
  name: string;

  @Prop()
  bio: string;

  @Prop()
  dob: Date;

  createdAt: Date;
  updatedAt: Date;
}

export type ProfileDocument = HydratedDocument<Profile>;

export const ProfileSchema = SchemaFactory.createForClass(Profile);
