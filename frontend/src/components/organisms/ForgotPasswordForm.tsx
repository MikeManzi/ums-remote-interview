import React from "react";
import FormContainer from "../molecules/FormContainer";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Title from "../atoms/Title";
import SubTitle from "../atoms/SubTitle";

const ForgotPasswordForm: React.FC = () => {
  return (
    <FormContainer>
      <Title>Reset password</Title>
      <SubTitle>
        Enter the email associated with your account and we'll send an email
        with password reset link
      </SubTitle>
      <form className="mt-8 relative">
        <label className="font-medium">Email Address</label>
        <Input type="email" name="email" placeholder="someone@example.com" />
        <Button type="submit">Send reset link</Button>
      </form>
    </FormContainer>
  );
};

export default ForgotPasswordForm;
