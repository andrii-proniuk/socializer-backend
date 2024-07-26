import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import bcrypt from 'bcrypt';

const ROUNDS = 8;

@Schema({ timestamps: true })
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  createdAt: Date;
  updatedAt: Date;

  static async hashPassword(plainPassword: string) {
    return bcrypt.hash(plainPassword, ROUNDS);
  }

  async compare(plainPassword: string) {
    return bcrypt.compare(plainPassword, this.password);
  }
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
