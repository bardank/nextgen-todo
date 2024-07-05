import { Schema, model } from "mongoose";
import { type IUser } from "../types/models";

export const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: false,
      select: false,
    },
    salt: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
    },
    toObject: {
      getters: true,
    },
  }
);

export const User = model("User", UserSchema, "users");

export default User;
