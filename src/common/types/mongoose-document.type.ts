import { Document } from 'mongoose';

export type MongooseDocument<T> = Document<unknown, any, T> & T;
