import React, { FC } from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return <div className="text-red-500 text-md my-4 capitalize">{message}</div>;
};

export default ErrorMessage;
