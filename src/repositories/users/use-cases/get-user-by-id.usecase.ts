import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class GetUserByIdUseCase {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async exec(id: string): Promise<User> {
    const user = await this.userModel.aggregate([
      { $match: { _id: id } },
      {
        $lookup: {
          from: 'profiles',
          let: { userId: '$_id' },
          pipeline: [{ $match: { $expr: { $eq: ['$user', '$userId'] } } }],
          as: 'profile',
        },
      },
      { $limit: 1 },
    ]);

    return user[0] as User;
  }
}
