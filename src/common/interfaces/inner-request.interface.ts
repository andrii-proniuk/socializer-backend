import { Request } from 'express';
import { User } from '../../repositories/entities/user.entity';

export interface InnerRequest extends Request {
  user: User;
}
