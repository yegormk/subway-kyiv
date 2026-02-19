import * as mongodb from 'mongodb';

export interface Station {
  _id?: mongodb.ObjectId;
  name: string;
  description: string;
  coordinates: number[];
  branch: 'red' | 'green' | 'blue';
}