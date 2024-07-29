import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class GetUserByIdUseCase {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async exec(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    return user;
  }
}
