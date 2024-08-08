import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../entities/user.entity';
import { Model } from 'mongoose';
import { MongooseDocument } from '../../../common/types/mongoose-document.type';

@Injectable()
export class GetUserByIdUseCase {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async exec(id: string): Promise<MongooseDocument<User>> {
    const user = await this.userModel.findById(id).populate('profile');

    return user;
  }
}
