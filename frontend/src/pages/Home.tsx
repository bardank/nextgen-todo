import { useEffect } from "react";
import CreateTodo from "../components/CreateTodo";
import {
  deleteTodoRequest,
  requestMyTodos,
  updateTodoRequest,
} from "../api/todo";
import useTodoStore from "../store/todos";
import TodoItem from "../components/TodoItem";
import Loading from "../components/loaders/Loading";
import { useAuthStore } from "../store/auth";
import { Todo } from "../types/todo";

const Home = () => {
  const { todos, setTodos, removeTodo, loading, updateTodo } = useTodoStore();
  const { user } = useAuthStore();
  useEffect(() => {
    loadMyTodos();
  }, [user]);

  const loadMyTodos = async () => {
    try {
      const res = await requestMyTodos();
      setTodos(res.data.todos);

    } catch (error) {}
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodoRequest(id);
      removeTodo(id);
    } catch (error) {}
  };

  const handelUpdate = async (todo: Todo) => {
    try {
      const res = await updateTodoRequest(
        todo._id,
        todo.title,
        todo.description,
        todo.isCompleted
      );
      updateTodo({
        ...todo,
        title: res.data.todo.title,
        description: res.data.todo.description,
        isCompleted: res.data.todo.isCompleted,
      });
    } catch (error) {}
  };

  return (
    <div className="w-full flex flex-col items-center py-4">
      <div className="w-full md:w-3/5 px-4 mb-8">
        <div className="py-4 text-xl">
          👋 Hi <span className="font-semibold ">{user!.name}</span>
        </div>

        <CreateTodo />
        <div className="mt-6 w-full">
          <div className="grid grid-cols-1 gap-4">
            {todos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onDelete={handleDelete}
                onToggleCompletion={handelUpdate}
              />
            ))}
          </div>
          {loading && <Loading />}
          {!loading && todos.length === 0 && (
            <div className="text-center text-gray-500 mt-4">No todos found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
