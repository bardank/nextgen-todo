//generate Register page

import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { Formik, FormikProps, Form } from "formik";
import * as Yup from "yup";
import Button from "../components/Button";
import { useAuthStore } from "../store/auth";
import { AxiosError } from "axios";
import ErrorMessage from "../components/ErrorMessage";
import { registerRequest } from "../api/auth";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { login, setTokens } = useAuthStore();
  const RegisterSchema = Yup.object<RegisterData>().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    name: Yup.string().required(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleRegister = async (values: RegisterData) => {
    try {
      const res = await registerRequest(
        values.name,
        values.email,
        values.password
      );
      if (res.status === 201) {
        login(res.data.user);
        setTokens(res.data.tokens);
      }
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        console.log(error.message);
        setError(error.response?.data.message);
      }
    }
  };

  return (
    <Fragment>
      <h3 className="font-semibold text-center text-3xl">Register</h3>
      <div className="">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
        >
          {(props: FormikProps<RegisterData>) => (
            <Form>
              <Input
                label="Name"
                type="text"
                name="name"
                placeholder={"Your Name"}
              />
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
                placeholder={"test@example.com"}
              />
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder={"Confirm Password"}
              />
              <Button className="mt-4" label="Register" type="submit" />
            </Form>
          )}
        </Formik>
        {error && <ErrorMessage message={error} />}
        <div className="mt-4">
          Already have an account?
          <Link to="/login" className="text-blue-500 ml-2">
            Login
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
