import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../entities/user.entity';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class GetUserUseCase {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async exec(findOptions: FilterQuery<User>): Promise<User> {
    const user = await this.userModel.findOne(findOptions);

    return user;
  }
}
