import * as mongodb from 'mongodb';

export interface Station {
  name: string;
  position: string;
  branch: 'red' | 'green' | 'blue';
  _id?: mongodb.ObjectId;
}