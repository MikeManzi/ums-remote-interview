import React, { useState, useEffect } from "react";
import FormContainer from "../molecules/FormContainer";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Title from "../atoms/Title";
import SubTitle from "../atoms/SubTitle";
import LinkText from "../atoms/LinkText";
import { signIn } from "../../services";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn({ email, password })
      .then(() => {
        navigate("/verify-otp");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  };

  useEffect(() => {
    let timer: number;
    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [errorMessage]);

  return (
    <FormContainer>
      <Title>Login</Title>
      <SubTitle>
        Don't have an account? <LinkText to="/sign-up">Sign up</LinkText>
      </SubTitle>
      <form className="mt-8 relative" onSubmit={handleSubmit}>
        {errorMessage && (
          <div className="absolute top-0 left-0 w-full bg-red-200 p-2 text-red-800 text-center">
            {errorMessage}
          </div>
        )}
        <div className="mb-4">
          <label className="font-medium">Email Address</label>
          <Input
            type="email"
            name="email"
            placeholder="someone@example.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>
        <label className="font-medium">Password</label>
        <Input
          type="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <div className="flex justify-end">
          <LinkText to="/forgot-password">Forgot Password?</LinkText>
        </div>
        <Button type="submit">Log in</Button>
      </form>
    </FormContainer>
  );
};

export default LoginForm;