import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Profile } from './profile.entity';

// enum MeetStatusEnum {
//   Preparing = 'preparing',
//   Started = 'started',
//   Ended = 'ended',
//   Canceled = 'canceled',
// }

@Schema({ timestamps: true, id: true })
export class Meet {
  id: string;
  _id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  })
  owner: Profile;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  location: {
    type: string;
    coordinates: number[];
  };

  @Prop({ type: Date, required: true })
  startAt: Date;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  // @Prop({ type: String, enum: MeetStatusEnum })
  // status: string;

  createdAt: Date;
  updatedAt: Date;
}

export type MeetDocument = HydratedDocument<Meet>;

export const MeetSchema = SchemaFactory.createForClass(Meet);
