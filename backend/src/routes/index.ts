import { Router } from "express";
import userRoutes from "./user.routes";
import todosService from "./todo.routes";
import authRoutes from "./auth.routes";
const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/todos", todosService);

export default router;
