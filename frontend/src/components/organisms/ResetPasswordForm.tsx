import React, { useState } from "react";
import FormContainer from "../molecules/FormContainer";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Title from "../atoms/Title";
import SubTitle from "../atoms/SubTitle";
import { useParams } from "react-router-dom";
import { resetPassword } from "../../services";

const ResetPasswordForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [values, setValues] = useState({
    password: '',
    confirmPassword: ''
  });
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    if (values.password !== values.confirmPassword) {
      alert("Password and confirm password do not match");
      return;
    }
    setIsLoading(true);
    resetPassword(token!, values.password)
      .then(response => {
        console.log("Reset password response:", response);
        setIsSubmitted(true);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error resetting password:", error);
        setIsLoading(false);
      });
  };

  const handleChange = (event: any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <FormContainer>
      <Title>New Password</Title>
      {isSubmitted ? (
        <div className="mt-5 text-center">
          <p className="text-lg">
            Your account password was updated successfully
          </p>
        </div>
      ) : (
        <>
          <SubTitle>You can now create a new password.</SubTitle>
          <form className="mt-8 relative" onSubmit={handleFormSubmit}>
            <label className="font-medium">New password</label>
            <Input
              type="password"
              name="password"
              placeholder="Enter new password"
              onChange={handleChange}
              required
            />
            <label className="font-medium">Confirm new password</label>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Re-tnter new password"
              onChange={handleChange}
              required
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </>
      )}
    </FormContainer>
  );
};

export default ResetPasswordForm;
