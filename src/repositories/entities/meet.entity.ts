import mongoose, { HydratedDocument } from 'mongoose';
import { LocationPoint } from '../../common/schema-types/location-point.type';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.entity';

@Schema({ timestamps: true, id: true })
export class Meet {
  id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: User;

  @Prop({ type: LocationPoint, required: true })
  location: object;

  @Prop()
  name: string;

  @Prop()
  description: string;

  createdAt: Date;
  updatedAt: Date;
}

export type MeetDocument = HydratedDocument<Meet>;

export const MeetSchema = SchemaFactory.createForClass(Meet);
