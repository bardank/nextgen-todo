import Joi from "joi";
import { type CreateTodoPayload, type UpdateTodoPayload } from "../types/todo";

export const CreateTodoBody = Joi.object<CreateTodoPayload>({
  description: Joi.string().min(3).required(),
  title: Joi.string().min(3).max(120).required(),
});

export const UpdateTodoBody = Joi.object<UpdateTodoPayload>({
  description: Joi.string().min(3),
  isCompleted: Joi.boolean(),
  title: Joi.string().min(3).max(200),
});
