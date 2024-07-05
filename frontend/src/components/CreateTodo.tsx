import React from "react";
import { Form, Formik, FormikProps, FormikState } from "formik";
import * as Yup from "yup";
import Button from "./Button";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import useTodoStore from "../store/todos";
import { createTodoRequest } from "../api/todo";
import { add, set } from "date-fns";
import { AxiosError } from "axios";

interface CreateTodoData {
  title: string;
  description: string;
}

const CreateTodo = () => {
  const { addTodo } = useTodoStore();
  const [error, setError] = React.useState<string | null>(null);
  const CreateTodoSchema = Yup.object().shape({
    title: Yup.string().required(),
    description: Yup.string().required(),
  });
  const handleCreateTodo = async (
    values: CreateTodoData,
    resetForm: (nextState?: Partial<FormikState<CreateTodoData>>) => void
  ) => {
    try {
      const res = await createTodoRequest(values.title, values.description);
      addTodo(res.data.todo);
      setError(null);
      resetForm();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
        setError(error.response?.data.message);
      }
    }
  };
  return (
    <div className="bg-gray-800 rounded-lg py-4 px-4">
      <h3 className="font-semibold text-xl my-4">Create Todo</h3>
      <Formik
        initialValues={{
          title: "",
          description: "",
        }}
        validationSchema={CreateTodoSchema}
        onSubmit={(values, { resetForm }) =>
          handleCreateTodo(values, resetForm)
        }
      >
        {(props: FormikProps<CreateTodoData>) => (
          <Form>
            <Input label="Title" type="text" name="title" placeholder="Title" />
            <TextArea
              label="Description"
              name="description"
              placeholder="Description"
            />

            <Button className="mt-4" label="Create" type="submit" />
            {/* {error && (
                <div className="text-red-500 text-xs my-4">{error}</div>
              )} */}
          </Form>
        )}
      </Formik>
      {error && <div className="text-red-500 text-xs my-4">{error}</div>}
    </div>
  );
};

export default CreateTodo;
