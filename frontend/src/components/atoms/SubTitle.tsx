import React from "react";

interface SubTitleProps {
  children: React.ReactNode;
}

const SubTitle: React.FC<SubTitleProps> = ({ children }) => {
  return <span className="text-gray-400 text-sm mt-2">{children}</span>;
};

export default SubTitle;
