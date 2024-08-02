import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.entity';

enum MeetStatusEnum {
  Preparing = 'preparing',
  Started = 'started',
  Ended = 'ended',
  Canceled = 'canceled',
}

@Schema({ timestamps: true, id: true })
export class Meet {
  id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: User;

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

  @Prop({ required: true })
  startAt: Date;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: String, enum: MeetStatusEnum })
  status: string;

  createdAt: Date;
  updatedAt: Date;
}

export type MeetDocument = HydratedDocument<Meet>;

export const MeetSchema = SchemaFactory.createForClass(Meet);
