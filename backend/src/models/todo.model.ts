import { type Query, Schema, model } from "mongoose";
import { type ITodo } from "../types/models";

export const TodoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    isCompleted: { type: Boolean, default: false },
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

TodoSchema.pre<Query<ITodo, ITodo>>(/^find/, async function (next) {
  await this.populate("user");
  next();
});

export const Todo = model("Todo", TodoSchema, "todos");
export default Todo;
