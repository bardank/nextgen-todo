import { type PopulatedDoc, type ObjectId } from "mongoose";

export interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  salt: string;
}

export interface ITodo {
  _id: ObjectId;
  title: string;
  description: string;
  user: PopulatedDoc<IUser>;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IToken {
  token: string;
  user: ObjectId;
  expires: Date;
  blacklisted: boolean;
}
