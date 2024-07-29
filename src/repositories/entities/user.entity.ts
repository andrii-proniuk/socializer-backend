import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

const ROUNDS = 8;

@Schema({ timestamps: true, id: true })
export class User {
  id: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  createdAt: Date;
  updatedAt: Date;

  static async hashPassword(plainPassword: string) {
    return bcrypt.hash(plainPassword, ROUNDS);
  }

  static async validatePassword(user: User, plainPassword: string) {
    return bcrypt.compare(plainPassword, user.password);
  }
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
