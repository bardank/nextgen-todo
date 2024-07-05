import { AccessAndRefreshTokens } from "./token";
import { User } from "./user";

export interface UserWithTokens {
  user: User;
  tokens: AccessAndRefreshTokens;
}
