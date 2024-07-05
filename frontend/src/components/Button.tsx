import React, { FC } from "react";
import Loading from "./loaders/Loading";

interface ButtonProps {
  label: string;
  loading?: boolean;
  className?: string;
  icon?: JSX.Element;
  type?: "submit" | "button" | "reset";
}

const Button: FC<ButtonProps> = ({
  label,
  icon,
  type = "submit",
  loading = false,
  className = "",
}) => {
  return (
    <button
      disabled={loading}
      className={`w-full bg-blue-500 p-3 rounded-md text-white flex justify-center items-center gap-2 ${className}`}
      type={type}
    >
      {loading ? (
        <Loading className="my-0" />
      ) : (
        <p className="text-center">{label}</p>
      )}
    </button>
  );
};

export default Button;
