import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../entities/user.entity';
import { Model } from 'mongoose';
import { SignUpDto } from '../../../auth/dto/sign-up.dto';
import { Profile } from '../../entities/profile.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async exec({ email, password, name, birthday }: SignUpDto): Promise<User> {
    const user = await this.userModel.create({
      email,
      password: await User.hashPassword(password),
    });

    await this.profileModel.create({
      user,
      name,
      birthday: new Date(birthday),
    });

    return user;
  }
}
