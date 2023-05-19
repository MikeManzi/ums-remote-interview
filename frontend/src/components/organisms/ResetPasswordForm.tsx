import React from "react";
import FormContainer from "../molecules/FormContainer";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Title from "../atoms/Title";
import SubTitle from "../atoms/SubTitle";

const ResetPasswordForm: React.FC = () => {
  return (
    <FormContainer>
      <Title>New Password</Title>
      <SubTitle>You can now create a new password.</SubTitle>
      <form className="mt-8 relative">
        <label className="font-medium">New password</label>
        <Input
          type="password"
          name="password"
          placeholder="Enter new password"
        />
        <label className="font-medium">Confirm new password</label>
        <Input
          type="password"
          name="password"
          placeholder="Re-tnter new password"
        />

        <Button type="submit">Save new password</Button>
      </form>
    </FormContainer>
  );
};

export default ResetPasswordForm;
