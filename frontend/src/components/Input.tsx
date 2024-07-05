"use client";
import { useField } from "formik";
import { useState } from "react";
import React from "react";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

interface InputProps {
  name: string;
  type: "text" | "password" | "email" | "number";
  placeholder: string;
  required?: boolean;
  label?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => Promise<string | void>;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  name,
  required = true,
  label,
  className = "",
  onChange,
  ...props
}) => {
  const [field, meta, helpers] = useField({
    name,
  });
  const [showPassword, setShowPassword] = useState(false);

  const [inputType, setType] = useState<
    "text" | "password" | "email" | "number"
  >(type);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setType(showPassword ? "password" : "text");
    // type = showPassword ? "text" : "password";
  };
  return (
    <>
      <div className="relative w-full my-2">
        {label && <div className="text-normal mb-1">{label}</div>}
        <input
          type={inputType}
          placeholder={placeholder}
          className={`w-full p-2 border bg-black text-white  focus:text-white border-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent ${className}`}
          required={required}
          {...field}
          {...props}
          onChange={async (e) => {
            field.onChange(e);
            if (onChange) {
              helpers.setTouched(true);
              const res = await onChange(e);
              if (typeof res === "string") {
                helpers.setError(res);
              }
            }
          }}
        />
        {type === "password" && (
          <div
            onClick={() => handlePasswordVisibility()}
            className="absolute right-3 top-[50%] cursor-pointer text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <LuEye className="text-2xl" />
            ) : (
              <LuEyeOff className="text-2xl" />
            )}
          </div>
        )}
        {meta.touched && meta.error ? (
          <div className="text-red-500 text-xs">{meta.error}</div>
        ) : null}
      </div>
    </>
  );
};

export default Input;
