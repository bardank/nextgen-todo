import { Router, type Request, type Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import validator from "../middlewares/validator.middleware";
import verifyTokenMiddleware from "../middlewares/verifyToken";
import todosService from "../services/todo/todo.service";
import type { CreateTodoPayload, UpdateTodoPayload } from "../types/todo";
const router = Router();

interface CreateTodoRequest extends Request {
  body: CreateTodoPayload;
}
router.post(
  "/",
  verifyTokenMiddleware,
  validator({ body: "CreateTodoBody" }),
  catchAsync(async (req: CreateTodoRequest, res) => {
    const { title, description } = req.body;
    const todo = await todosService.create(title, description, req.user!.id);
    return res.status(201).json({ todo });
  })
);

router.get(
  "/",
  verifyTokenMiddleware,
  catchAsync(async (req, res) => {
    const todos = await todosService.findAll();
    return res.status(200).json({ todos });
  })
);

router.get(
  "/my-todos",
  verifyTokenMiddleware,
  catchAsync(async (req: Request, res: Response) => {
    const todos = await todosService.findAllByUser(req.user!.id);
    return res.status(200).json({ todos });
  })
);

router.get(
  "/:id",
  verifyTokenMiddleware,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const todo = await todosService.findOneById(id);
    return res.status(200).json({ todo });
  })
);
interface UpdateTodoRequest extends Request {
  body: UpdateTodoPayload;
}
router.put(
  "/:id",
  verifyTokenMiddleware,
  validator({ body: "UpdateTodoBody" }),
  catchAsync(async (req: UpdateTodoRequest, res: Response) => {
    const { id } = req.params;
    const { title, description, isCompleted } = req.body;
    const todo = await todosService.update(id, title, description, isCompleted);
    return res.status(200).json({ todo });
  })
);

router.delete(
  "/:id",
  verifyTokenMiddleware,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const data = await todosService.remove(id, req.user!.id);
    return res.status(200).json({ ...data });
  })
);

export default router;
