import React, { ReactNode } from "react";

type ButtonProps = {
  type: "button" | "submit" | "reset" | undefined;
  children: ReactNode;
  onClick?: any;
  disabled?: boolean;
  cancel?: boolean;
};

const Button: React.FC<ButtonProps> = ({ type, children, onClick, cancel }) => {
  return cancel ? (
    <button
      type={type}
      className={`border-2 border-red-600 text-red-600 w-full rounded-lg ${
        type === "button" ? "py-2" : "py-3"
      } px-4 max-w-sm mt-4`}
      onClick={onClick}
    >
      {children}
    </button>
  ) : (
    <button
      type={type}
      className={`bg-green-800 text-white w-full rounded-lg ${
        type === "button" ? "py-2" : "py-3"
      } px-4 max-w-sm mt-4`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
