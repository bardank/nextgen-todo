import { HttpError } from "../../libs/httpError";
import type { HttpErrorPayload } from "../../types/error";
import {
  comparePassword,
  encryptPassword,
  generateSalt,
} from "../../utils/bcrypt";
import userService from "../user/user.service";
import tokenService from "../token/token.service";
import { type IUserWithTokens } from "../../types/user.types";

const login = async (
  email: string,
  password: string
): Promise<IUserWithTokens> => {
  const errObj: HttpErrorPayload = {
    code: 400,
    type: "BAD_REQUEST",
    message: "Invalid credentials!",
  };
  const user = await userService.findOneByEmail(email, true);
  if (!user) {
    throw new HttpError({
      code: 403,
      type: "UNAUTHORIZED",
      message: "User not found!",
    });
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new HttpError(errObj);
  }
  user.password = "";
  user.salt = "";
  const tokens = await tokenService.generateAuthTokens(user);
  return {
    user,
    tokens,
  };
};

const register = async (
  name: string,
  email: string,
  password: string
): Promise<IUserWithTokens> => {
  const validatedUser = await userService.findOneByEmail(email);
  if (validatedUser) {
    throw new HttpError({
      code: 400,
      type: "BAD_REQUEST",
      message: "User already exists!",
    });
  }

  name = name
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
    .join(" ");

  const salt = await generateSalt();
  password = await encryptPassword(password, salt);

  const user = await userService.create(name, email, password, salt);

  user.password = "";
  user.salt = "";
  const tokens = await tokenService.generateAuthTokens(user);
  return {
    user,
    tokens,
  };
};

const refreshToken = async (refreshToken: string): Promise<IUserWithTokens> => {
  const errObj: HttpErrorPayload = {
    code: 400,
    type: "BAD_REQUEST",
    message: "Invalid credentials!",
  };

  const token = await tokenService.findOneByToken(refreshToken);
  if (!token || token.blacklisted) {
    throw new HttpError(errObj);
  }

  const user = await userService.findOneById(token.user as unknown as string);
  if (!user) {
    throw new HttpError({
      code: 403,
      type: "UNAUTHORIZED",
      message: "User not found!",
    });
  }

  const tokens = await tokenService.generateAuthTokens(user);

  return {
    user,
    tokens,
  };
};

const logout = async (
  refreshToken: string
): Promise<{ message: string; success: boolean }> => {
  const token = await tokenService.blacklistToken(refreshToken);
  if (!token) {
    throw new HttpError({
      code: 400,
      type: "BAD_REQUEST",
      message: "Invalid credentials!",
    });
  }

  return { message: "User logged out successfully!", success: true };
};

const authService = {
  login,
  register,
  refreshToken,
  logout,
};

export default authService;
