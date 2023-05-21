import React, { useState, useEffect } from "react";
import FormContainer from "../molecules/FormContainer";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Title from "../atoms/Title";
import SubTitle from "../atoms/SubTitle";
import LinkText from "../atoms/LinkText";
import { newUser } from "../../services";
import { useNavigate } from "react-router-dom";
import SelectInput from "../atoms/SelectInput";
import attach from "../../assets/attach.svg";

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [martialStatus, setMartialStatus] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [image, setImage] = useState<any>();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("gender", gender);
    formData.append("dateOfBirth", dob);
    formData.append("maritalStatus", martialStatus);
    formData.append("nationality", nationality);
    formData.append("image", image);
    newUser(formData)
      .then(() => {
        navigate("/sign-in");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
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
      <Title>Sign Up</Title>
      <SubTitle>
        Already have an account? <LinkText to="/sign-in">Login</LinkText>
      </SubTitle>
      <form className="mt-8 relative" onSubmit={handleSubmit}>
        {errorMessage && (
          <div className="absolute top-0 left-0 w-full bg-red-200 p-2 text-red-800 text-center">
            {errorMessage}
          </div>
        )}
        <div>
          <label className="font-medium">First name</label>
          <Input
            type="text"
            name="names"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFirstName(e.target.value)
            }
            required
          />
        </div>
        <div className="mt-4">
          <label className="font-medium">Last name</label>
          <Input
            type="text"
            name="names"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLastName(e.target.value)
            }
            required
          />
        </div>
        <div className="mt-4">
          <label className="font-medium">Email Address</label>
          <Input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
          />
        </div>
        <div className="mt-4">
          <label className="font-medium">Gender</label>
          <div className=" text-black flex">
            <Input
              type="radio"
              name="gender"
              value="female"
              onChange={() => setGender("FEMALE")}
            />
            <label htmlFor="" className="mt-2 ml-2 mr-8">
              Female
            </label>
            <Input
              type="radio"
              name="gender"
              value="male"
              onChange={() => setGender("MALE")}
            />
            <label htmlFor="" className="ml-2 mt-2">
              Male
            </label>
          </div>
        </div>
        <div className="mt-4">
          <label className="font-medium">Date of Birth</label>
          <Input
            type="date"
            name="dob"
            placeholder="Enter date of birth"
            value={dob}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDob(e.target.value)
            }
            required
          />
        </div>
        <div className="mt-4">
          <label className="font-medium">Martial Status</label>
          <div className=" text-black flex">
            <Input
              type="radio"
              name="martialStatus"
              value="married"
              onChange={() => setMartialStatus("MARRIED")}
            />
            <label htmlFor="" className="mt-2 ml-2 mr-4">
              Married
            </label>
            <Input
              type="radio"
              name="martialStatus"
              value="single"
              onChange={() => setMartialStatus("SINGLE")}
            />
            <label htmlFor="" className="ml-2 mt-2 mr-4">
              Single
            </label>
            <Input
              type="radio"
              name="martialStatus"
              value="divorced"
              onChange={() => setMartialStatus("DIVORCED")}
            />
            <label htmlFor="" className="mt-2 ml-2 mr-4">
              Divorced
            </label>
            <Input
              type="radio"
              name="martialStatus"
              value="widowed"
              onChange={() => setMartialStatus("WIDOWED")}
            />
            <label htmlFor="" className="ml-2 mt-2">
              Widowed
            </label>
          </div>
        </div>
        <div className="mt-4">
          <label className="font-medium">Nationality</label>
          <SelectInput
            selectedCountry={nationality}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNationality(e.target.value)
            }
          />
        </div>
        <div className="mt-4">
          <label className="font-medium">Profile image</label>
          <div className="rounded-lg border-2 border-green-700 flex items-center p-2 mt-2">
            <img src={attach} alt="Attach" />
            <input
              type="file"
              name="image"
              className="opacity-0 absolute overflow-hidden -z-1"
              onChange={handleFileChange}
              required
            />
            <div className="ml-2 text-sm text-green-700 font-medium">
              Upload profile image
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label className="font-medium">Password</label>
          <Input
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
          />
        </div>
        <div className="my-4">
          <label className="font-medium">Confirm Password</label>
          <Input
            type="password"
            name="confirm_password"
            placeholder="Enter password"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
            required
          />
        </div>
        <Button type="submit">Sign Up</Button>
      </form>
    </FormContainer>
  );
};

export default SignUpForm;
