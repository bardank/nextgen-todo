import Joi from "joi";
import {
  type LoginPayload,
  type RegisterPayload,
  type RefreshTokenPayload,
} from "../types/auth";

export const RegisterUserBody = Joi.object<RegisterPayload>({
  email: Joi.string().email().required(),
  name: Joi.string().min(3).max(64).required(),
  password: Joi.string().min(6).max(64).required(),
});

export const LoginUserBody = Joi.object<LoginPayload>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(64).required(),
});

export const RefreshTokenBody = Joi.object<RefreshTokenPayload>({
  refreshToken: Joi.string().required(),
});
