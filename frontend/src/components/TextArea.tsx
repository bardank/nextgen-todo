import React, { FC } from "react";
import { useField } from "formik";

interface TextAreaProps {
  name: string;
  placeholder: string;
  id?: string;
  required?: boolean;
  label?: string;
}

const TextArea: FC<TextAreaProps> = ({
  placeholder,
  name,
  required = true,
  id,
  label,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  return (
    <>
      <div>
        <div className="mb-1">{label}</div>
        <textarea
          id={id}
          cols={30}
          rows={5}
          className="border-2 w-full bg-black text-white  focus:text-white border-gray-500 p-3 rounded-md focus:ring-1 focus:ring-blue-400"
          placeholder={placeholder}
          {...field}
          {...props}
        ></textarea>
        {meta.touched && meta.error ? (
          <div className="text-red-500 text-xs">{meta.error}</div>
        ) : null}
      </div>
    </>
  );
};

export default TextArea;
