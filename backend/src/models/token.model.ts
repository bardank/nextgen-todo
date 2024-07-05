import { Schema, model } from "mongoose";
import { type IToken } from "../types/models";

const TokenSchema = new Schema<IToken>(
  {
    token: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    expires: { type: Date, required: true },
    blacklisted: { type: Boolean, default: false },
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

const Token = model("Token", TokenSchema, "tokens");

export default Token;
