import React from "react";
import { Link } from "react-router-dom";

interface LinkTextProps {
  children: React.ReactNode;
  to: string;
}

const LinkText: React.FC<LinkTextProps> = ({ children, to }) => {
  return (
    <Link
      to={to}
      className="text-green-700 underline cursor-pointer mt-2 text-sm"
    >
      {children}
    </Link>
  );
};

export default LinkText;
