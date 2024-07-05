//generate login page

import React, { Fragment, useState } from "react";
import { Link, redirect } from "react-router-dom";
import Input from "../components/Input";
import { Formik, FormikProps, Form } from "formik";
import * as Yup from "yup";
import Button from "../components/Button";
import axios from "../libs/axios";
import { AxiosError } from "axios";
import { UserWithTokens } from "../types/auth";
import { loginRequest } from "../api/auth";
import { useAuthStore } from "../store/auth";
import { set } from "date-fns";
import ErrorMessage from "../components/ErrorMessage";
interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { login, setTokens } = useAuthStore();

  const [error, setError] = useState<string | null>(null);

  const LoginSchema = Yup.object<LoginData>().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const handleLogin = async (values: LoginData) => {
    try {
      const res = await loginRequest(values.email, values.password);
      login(res.data.user);
      redirect("/");
      setTokens(res.data.tokens);
      setError(null);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
        setError(error.response?.data.message);
      }
    }
  };

  return (
    <Fragment>
      <h3 className="font-semibold text-center text-3xl">Login</h3>
      <div className="">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {(props: FormikProps<LoginData>) => (
            <Form>
              <Input
                label="Email"
                type="email"
                name="email"
                placeholder={"test@example.com"}
              />
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder={"**********"}
              />
              <Button className="mt-4" label="Login" type="submit" />
              {error && <ErrorMessage message={error} />}
            </Form>
          )}
        </Formik>
        <div className="mt-4">
          Don't have an account?
          <Link to="/register" className="text-blue-500 ml-2">
            Register
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
