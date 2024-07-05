import {
  type NextFunction,
  type Request,
  type Response,
  Router,
} from "express";
import userService from "../services/user/user.service";
import verifyTokenMiddleware from "../middlewares/verifyToken";
import { catchAsync } from "../utils/catchAsync";
const router = Router();

router.get(
  "/me",
  verifyTokenMiddleware,
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.findOneById(req.user!.id);
    return res.status(200).json({ user });
  })
);

export default router;
