import Token from "../../models/token.model";
import { type IToken, type IUser } from "../../types/models";
import * as jwt from "jsonwebtoken";
import {
  addSeconds,
  getUnixTime,
} from "date-fns";
import parseExpirationTime from "../../utils/expirationParser";
import { type AccessAndRefreshTokens } from "../../types/token";

const generateToken = (id: string, email: string, expiresAt: Date): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT secret and expiration time are required");
  }

  const payload = {
    id,
    email,
    iat: getUnixTime(new Date()),
    exp: getUnixTime(expiresAt),
  };


  const accessToken = jwt.sign(payload, secret);
  return accessToken;
};

const generateAuthTokens = async (
  user: IUser
): Promise<AccessAndRefreshTokens> => {
  const accessTokenExpires = addSeconds(
    new Date(),
    parseExpirationTime(process.env.ACCESS_TOKEN_EXPIRES_IN!)
  );
  const accessToken = generateToken(
    user._id as unknown as string,
    user.email,
    accessTokenExpires
  );

  const refreshTokenExpires = addSeconds(
    new Date(),
    parseExpirationTime(process.env.RERESH_TOKEN_EXPIRES_IN!)
  );
  const refreshToken = generateToken(
    user._id as unknown as string,
    user.email,
    refreshTokenExpires
  );

  await create(
    refreshToken,
    user._id as unknown as string,
    refreshTokenExpires
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires,
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires,
    },
  };
};

const create = async (
  token: string,
  userId: string,
  expires: Date
): Promise<IToken> => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires,
  });
  return tokenDoc;
};

const findOneByToken = async (token: string): Promise<IToken | null> => {
  return await Token.findOne({ token, blacklisted: false });
};

const blacklistToken = async (token: string): Promise<IToken | null> => {
  return await Token.findOneAndUpdate(
    { token },
    { blacklisted: true },
    { new: true }
  );
};

const tokenService = {
  generateToken,
  generateAuthTokens,
  create,
  findOneByToken,
  blacklistToken,
};

export default tokenService;
