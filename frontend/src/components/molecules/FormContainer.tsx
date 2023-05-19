import { ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
}

const FormContainer = ({ children }: FormContainerProps) => {
  return (
    <div className="absolute w-full min-h-screen bg-green-50 bg-opacity-70 flex flex-col justify-center pb-10">
      <div className="mt-10 w-full max-w-md p-10 mx-auto bg-white shadow-xl shadow-neutral-100">
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
