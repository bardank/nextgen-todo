import { type ITodo } from "../../types/models";
import { HttpError } from "../../libs/httpError";
import { Todo } from "../../models/todo.model";

const create = async (
  title: string,
  description: string,
  userId: string
): Promise<ITodo> => {
  const todo = await Todo.create({
    title,
    description,
    user: userId,
  });
  return todo;
};

const findOneById = async (id: string): Promise<ITodo | null> => {
  return await Todo.findOne({ _id: id }).populate("user");
};

const findAll = async (): Promise<ITodo[]> => {
  return await Todo.find();
};

const findAllByUser = async (userId: string): Promise<ITodo[]> => {
  console.log(userId);
  return await Todo.find({ user: userId })
    .populate("user")
    .sort({ createdAt: -1 });
};

const update = async (
  id: string,
  title: string,
  description: string,
  isCompleted: boolean
): Promise<ITodo | null> => {
  return await Todo.findByIdAndUpdate(
    id,
    { title, description, isCompleted },
    { new: true }
  );
};

const remove = async (
  id: string,
  userId: string
): Promise<{ data: ITodo | null; message: string; success: boolean }> => {
  console.log({ id, userId });
  const deletedTodo = await Todo.findOneAndDelete({
    _id: id,
    user: userId,
  });

  console.log(deletedTodo);

  if (!deletedTodo) {
    throw new HttpError({
      code: 404,
      type: "NOT_FOUND",
      message: "Todo not found!",
    });
  }

  return {
    data: deletedTodo,
    message: "Todo deleted successfully!",
    success: true,
  };
};

const todosService = {
  create,
  findOneById,
  findAll,
  findAllByUser,
  update,
  remove,
};

export default todosService;
