import axios from "../libs/axios";
import { UserWithTokens } from "../types/auth";

export const loginRequest = async (email: string, password: string) =>
  axios.post<UserWithTokens>("/auth/login", { email, password });

export const registerRequest = async (
  name: string,
  email: string,
  password: string
) => axios.post<UserWithTokens>("/auth/register", { name, email, password });

export const refreshTokenRequest = async (refreshToken: string) =>
  axios.post<UserWithTokens>("/auth/refresh-token", { refreshToken });

export const logoutRequest = async (refreshToken: string) =>
  axios.post("/auth/logout", {
    refreshToken,
  });
