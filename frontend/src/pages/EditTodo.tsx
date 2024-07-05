import React, { FC, useEffect, useState } from "react";
import { Todo } from "../types/todo";
import { useNavigate } from "react-router-dom";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { format, set } from "date-fns";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import { useParams } from "react-router-dom";
import {
  deleteTodoRequest,
  requestTodoById,
  updateTodoRequest,
} from "../api/todo";
import { AxiosError } from "axios";
import { IoMdArrowBack } from "react-icons/io";
import Loading from "../components/loaders/Loading";
import Button from "../components/Button";
import { FaTrash } from "react-icons/fa";
import useTodoStore from "../store/todos";

interface TodoData {
  title: string;
  description: string;
  isCompleted: boolean;
}
const EditTodo: FC = () => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { removeTodo, updateTodo } = useTodoStore();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    fetchTodo(id!);
  }, [id]);

  const fetchTodo = async (id: string) => {
    try {
      const res = await requestTodoById(id);
      setTodo(res.data.todo);
      setLoading(false);
      setError(null);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
        setError(error.response?.data.message);
      }
      setLoading(false);
      setTodo(null);
    }
  };
  const TodoSchema = Yup.object<TodoData>().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    isCompleted: Yup.boolean().required(),
  });

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
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteTodoRequest(id);
      removeTodo(id);
    } catch (error) {}
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-center pt-6">
      <div className="w-full md:w-3/5 px-4 ">
        <div className="py-4">
          <IoMdArrowBack
            onClick={goBack}
            className="text-white cursor-pointer text-3xl"
          />
        </div>
        <div className="rounded bg-gray-800 shadow-2xl p-4 ">
          {loading && <Loading />}
          {todo && (
            <>
              <h4 className="text-xl font-semibold pb-2">Edit Todo</h4>
              <Formik
                initialValues={{
                  title: todo.title,
                  description: todo.description,
                  isCompleted: todo.isCompleted,
                }}
                validationSchema={TodoSchema}
                onSubmit={(values) => {
                  handelUpdate({
                    ...values,
                    _id: todo._id,
                    createdAt: todo.createdAt,
                    updatedAt: todo.updatedAt,
                  });
                  goBack();
                }}
              >
                {(props: FormikProps<TodoData>) => (
                  <Form>
                    <Input
                      type="text"
                      name="title"
                      placeholder="Title"
                      className=""
                    />
                    <TextArea name="description" placeholder="Description" />
                    <Button type="submit" className="mt-4" label="Submit" />
                  </Form>
                )}
              </Formik>
              <p className="text-xs font-light my-4">
                {format(
                  new Date(todo.updatedAt),
                  "h ':' mm bbb EEEE MMM do, yyyy"
                )}
              </p>
              <div className="flex justify-between items-center gap-4 ">
                <div>
                  <a
                    className="cursor-pointer text-blue-500 hover:text-blue-700"
                    onClick={() =>
                      updateTodo({
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
                    onClick={() => handleDelete(todo._id)}
                  />
                </div>
              </div>
            </>
          )}

          {error && <div className="text-red-500 text-xs my-4">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default EditTodo;
function updateTodo(arg0: {
  title: string;
  description: string;
  isCompleted: boolean;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}) {
  throw new Error("Function not implemented.");
}
