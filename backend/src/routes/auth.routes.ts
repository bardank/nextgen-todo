import {
  type NextFunction,
  type Request,
  type Response,
  Router,
} from "express";
import {
  type LoginPayload,
  type RefreshTokenPayload,
  type RegisterPayload,
} from "../types/auth";
import validator from "../middlewares/validator.middleware";
import { catchAsync } from "../utils/catchAsync";
import authService from "../services/auth/auth.service";
import verifyToken from "../middlewares/verifyToken";
const router = Router();

interface LoginRequest extends Request {
  body: LoginPayload;
}

router.post(
  "/login",
  validator({ body: "LoginUserBody" }),
  catchAsync(async (req: LoginRequest, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    return res.status(200).json({ ...data });
  })
);

interface RegisterRequest extends Request {
  body: RegisterPayload;
}

router.post(
  "/register",
  validator({ body: "RegisterUserBody" }),
  catchAsync(
    async (req: RegisterRequest, res: Response, next: NextFunction) => {
      const { name, email, password } = req.body;

      const user = await authService.register(name, email, password);
      return res.status(201).json({ user });
    }
  )
);

interface RefreshTokenRequest extends Request {
  body: RefreshTokenPayload;
}

router.post(
  "/refresh-token",
  verifyToken,
  catchAsync(async (req: RefreshTokenRequest, res: Response) => {
    const tokens = await authService.refreshToken(req.body.refreshToken);
    return res.status(200).json({ tokens });
  })
);

interface LogoutRequest extends Request {
  body: RefreshTokenPayload;
}

router.post(
  "/logout",
  verifyToken,
  catchAsync(async (req: LogoutRequest, res: Response) => {
    await authService.logout(req.body.refreshToken);
    return res.status(200).json({ message: "Logged out successfully!" });
  })
);

export default router;
