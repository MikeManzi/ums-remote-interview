import React from "react";

interface TitleProps {
  children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return <p className="font-bold text-3xl">{children}</p>;
};

export default Title;
