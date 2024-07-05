import React, { FC } from "react";
import { Todo } from "../types/todo";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import Input from "./Input";
import TextArea from "./TextArea";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Button from "./Button";
interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggleCompletion: (todo: Todo) => void;
}

const TodoItem: FC<TodoItemProps> = ({
  todo,
  onDelete,
  onToggleCompletion,
}) => {
  return (
    <div className="rounded bg-gray-800 shadow-2xl p-4 ">
      <div className="flex justify-end gap-4">
        <p>
          {todo.isCompleted ? (
            <span className="text-green-500">Completed</span>
          ) : (
            <span className="text-red-500">Pending</span>
          )}
        </p>
        <Link to={`/todos/${todo._id}`}>
          <p className="">Edit</p>
        </Link>
      </div>
      <Link to={`/todos/${todo._id}`}>
        <h4 className="text-xl font-semibold pb-2">{todo.title}</h4>
      </Link>
      <p className="text-sm font-medium py-2">{todo.description}</p>
      <p className="text-xs font-light my-4">
        {format(new Date(todo.updatedAt), "h ':' mm bbb EEEE MMM do, yyyy")}
      </p>
      <div className="flex justify-between items-center gap-4 ">
        <div>
          <a
            className="cursor-pointer text-blue-500 hover:text-blue-700"
            onClick={() =>
              onToggleCompletion({
                ...todo,
                isCompleted: !todo.isCompleted,
              })
            }
          >
            {todo.isCompleted ? "Mark as Pending" : "Mark as Completed"}
          </a>
        </div>
        <div>
          <FaTrash
            className="text-red-500 text-md cursor-pointer hover:text-red-700"
            onClick={() => onDelete(todo._id)}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
