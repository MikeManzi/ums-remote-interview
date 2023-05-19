import React from "react";

interface InputProps {
  type: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  value?: string | number;
  onChange?: any;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  placeholder,
  required,
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      value={value}
      className={`border-2 border-gray-400 border-opacity-25 block outline-none p-2 ${
        type !== "radio" && "w-full"
      } max-w-sm rounded-lg mt-2`}
      onChange={onChange}
    />
  );
};

export default Input;
