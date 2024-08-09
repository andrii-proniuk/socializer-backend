import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Meet } from '../../entities/meet.entity';
import { Model } from 'mongoose';
import { MongooseDocument } from '../../../common/types/mongoose-document.type';

@Injectable()
export class GetMeetByIdUseCase {
  constructor(@InjectModel(Meet.name) private meetModel: Model<Meet>) {}

  async exec(id: string): Promise<MongooseDocument<Meet>> {
    const meet = await this.meetModel.findById(id).populate('owner');

    return meet;
  }
}
