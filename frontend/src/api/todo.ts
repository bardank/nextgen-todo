import axios from "../libs/axios";
import { Todo } from "../types/todo";

export const requestMyTodos = async () =>
  axios.get<{ todos: Todo[] }>("/todos/my-todos");

export const requestTodoById = async (id: string) =>
  axios.get<{ todo: Todo }>(`/todos/${id}`);

export const createTodoRequest = async (title: string, description: string) =>
  axios.post<{ todo: Todo }>("/todos", { title, description });

export const updateTodoRequest = async (
  id: string,
  title: string,
  description: string,
  isCompleted: boolean
) =>
  axios.put<{ todo: Todo }>(`/todos/${id}`, {
    title,
    description,
    isCompleted,
  });

export const deleteTodoRequest = async (id: string) =>
  axios.delete<{ message: string; success: boolean }>(`/todos/${id}`);
