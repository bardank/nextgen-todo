import { type JwtPayload } from "jsonwebtoken";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthToken extends JwtPayload {
  id: string;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}
