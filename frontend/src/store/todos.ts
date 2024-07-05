import { create } from "zustand";
import { Todo } from "../types/todo";

interface TodoStore {
  todos: Todo[];
  loading: boolean;
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  loading: true,
  setTodos: (todos) => set({ todos, loading: false }),
  addTodo: (todo) =>
    set((state) => ({ todos: [todo, ...state.todos], loading: false })),
  updateTodo: (todo) =>
    set((state) => ({
      todos: state.todos.map((t) => (t._id === todo._id ? todo : t)),
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo._id !== id),
    })),
}));

export default useTodoStore;
