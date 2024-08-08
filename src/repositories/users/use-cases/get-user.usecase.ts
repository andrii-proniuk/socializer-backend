import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../entities/user.entity';
import { FilterQuery, Model } from 'mongoose';
import { MongooseDocument } from '../../../common/types/mongoose-document.type';

@Injectable()
export class GetUserUseCase {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async exec(findOptions: FilterQuery<User>): Promise<MongooseDocument<User>> {
    const user = await this.userModel.findOne(findOptions);

    return user;
  }
}
