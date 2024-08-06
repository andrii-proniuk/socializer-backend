import { Request } from 'express';
import { User } from '../../repositories/entities/user.entity';
import { Meet } from '../../repositories/entities/meet.entity';
import { Profile } from '../../repositories/entities/profile.entity';
import { MeetMember } from '../../repositories/entities/meet-member';

export interface InnerRequest extends Request {
  user: User;
  locals?: {
    user?: User;
    profile?: Profile;
    meet?: Meet;
    meetMember?: MeetMember;
  };
}
