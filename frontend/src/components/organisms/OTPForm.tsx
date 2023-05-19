import React from "react";
import FormContainer from "../molecules/FormContainer";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Title from "../atoms/Title";
import SubTitle from "../atoms/SubTitle";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../../services";
import { setCurrentUser } from "../../store/reducers/userSlice";
import { useDispatch } from "react-redux";

const OTPForm: React.FC = () => {
  const [otp, setOtp] = React.useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    verifyOtp(otp)
      .then((res) => {
        dispatch(setCurrentUser(res.data.data));
        localStorage.setItem("accessToken", res.data.data.accessToken);
        if (res.data.data.user.role === "ADMIN") navigate("/dashboard");
        else navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <FormContainer>
      <Title>Verify OTP</Title>
      <SubTitle>Enter the code sent to your email</SubTitle>
      <form className="mt-8 relative" onSubmit={handleSubmit}>
        <label className="font-medium">OTP</label>
        <Input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setOtp(e.target.value)
          }
        />
        <Button type="submit">Verify</Button>
      </form>
    </FormContainer>
  );
};

export default OTPForm;
