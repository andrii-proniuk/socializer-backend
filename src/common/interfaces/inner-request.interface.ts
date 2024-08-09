import { Request } from 'express';
import { User } from '../../repositories/entities/user.entity';
import { Meet } from '../../repositories/entities/meet.entity';
import { Profile } from '../../repositories/entities/profile.entity';
import { MeetMember } from '../../repositories/entities/meet-member';
import { MongooseDocument } from '../types/mongoose-document.type';

export interface InnerRequest extends Request {
  user: User;
  locals?: {
    user?: MongooseDocument<User>;
    profile?: MongooseDocument<Profile>;
    meet?: MongooseDocument<Meet>;
    meetMember?: MongooseDocument<MeetMember>;
  };
}
