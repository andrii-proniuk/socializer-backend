import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class LocationPoint {
  @Prop({ required: true })
  type: string;

  @Prop({ type: [Number], required: true })
  coordinates: number[];
}

export const LocationPointSchema = SchemaFactory.createForClass(LocationPoint);
