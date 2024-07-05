export interface AccessAndRefreshTokens {
  access: TokenPayload;
  refresh: TokenPayload;
}
export interface TokenPayload {
  token: string;
  expires: Date;
}
