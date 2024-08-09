import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, id: true })
export class Profile {
  id: string;
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String })
  avatar: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop()
  bio: string;

  @Prop({ type: Date, required: true })
  dob: Date;

  createdAt: Date;
  updatedAt: Date;
}

export type ProfileDocument = HydratedDocument<Profile>;

export const ProfileSchema = SchemaFactory.createForClass(Profile);
