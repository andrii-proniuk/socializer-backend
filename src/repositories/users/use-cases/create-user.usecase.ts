import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../entities/user.entity';
import { Model } from 'mongoose';
import { SignUpDto } from '../../../auth/dto/sign-up.dto';
import { Profile } from '../../entities/profile.entity';
import { MongooseDocument } from '../../../common/types/mongoose-document.type';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async exec({
    email,
    password,
    name,
    dob,
  }: SignUpDto): Promise<MongooseDocument<User>> {
    const profile = await this.profileModel.create({
      name,
      dob: new Date(dob),
    });

    const user = await this.userModel.create({
      email,
      password: await User.hashPassword(password),
      profile,
    });

    return user;
  }
}
