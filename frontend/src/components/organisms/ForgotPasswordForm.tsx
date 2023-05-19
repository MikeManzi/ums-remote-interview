import React, { useState } from "react";
import FormContainer from "../molecules/FormContainer";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Title from "../atoms/Title";
import SubTitle from "../atoms/SubTitle";
import { forgotPassoword } from "../../services"

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    forgotPassoword({ email })
      .then(() => {
        setIsSubmitted(true);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error sending email:", error);
        setIsLoading(false);
      });
  };
  return (
    <FormContainer>
      <Title>Reset password</Title>
      {isSubmitted ? (

        <div className="mt-5 text-center">
          <p className="text-lg">
            We've sent you an email with instructions to reset your password.
          </p>
        </div>
      ) : (
        <>
          <SubTitle>
            Enter the email associated with your account and we'll send an email
            with password reset link
          </SubTitle>
          <form className="mt-8 relative" onSubmit={handleSubmit}>
            <label className="font-medium">Email Address</label>
            <Input
              type="email"
              name="email"
              placeholder="someone@example.com"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </form>
        </>
      )}

    </FormContainer>
  );
};

export default ForgotPasswordForm;
