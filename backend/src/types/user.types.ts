import { type IUser } from "./models";
import { type AccessAndRefreshTokens } from "./token";

export interface IUserWithTokens {
  user: IUser;
  tokens: AccessAndRefreshTokens;
}
