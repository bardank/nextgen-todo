import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { type AuthToken } from "../types/auth";
import { HttpError } from "../libs/httpError";

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authToken = req.headers.authorization
      ?.replace(/^Bearer\s/, "")
      .trim();
    if (!authToken) {
      next(new HttpError({ code: 401, type: "UNAUTHORIZED" })); return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const { id } = jwt.verify(
      authToken,
      process.env.JWT_SECRET!
    ) as AuthToken;

    const user = await User.findOne({ _id: id }).select("role organisation");

    if (!user) {
      next(new HttpError({ code: 401, type: "UNAUTHORIZED" })); return;
    }
    Object.assign(req, {
      user: {
        id: user._id.toString(),
      },
    });

    next();
  } catch (error) {
    next(new HttpError({ code: 401, type: "UNAUTHORIZED" }));
  }
};
