import Title from "../atoms/Title";
import CloseButton from "../atoms/CloseButton";
import Input from "../atoms/Input";
import attach from "../../assets/attach.svg";
import Button from "../atoms/Button";
import { Link, useNavigate } from "react-router-dom";
import { newVerificationRequest } from "../../services";
import React from "react";
import { setStatusToPending } from "../../store/reducers/userSlice";
import { useDispatch } from "react-redux";

export default function RequestVerificationForm() {
  const [image, setImage] = React.useState<any>();
  const [docNumber, setDocNumber] = React.useState<string>("");
  const [docType, setDocType] = React.useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("type", docType);
    formData.append("number", docNumber);
    formData.append("image", image);
    newVerificationRequest(formData)
      .then(() => {
        dispatch(setStatusToPending());
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mt-10 max-w-md p-10 mx-auto bg-white shadow-xl shadow-neutral-100 flex flex-col">
      <div className="flex justify-between items-center">
        <Title>Request Verification</Title>
        <Link to="/">
          <CloseButton />
        </Link>
      </div>
      <form className="mt-8 relative" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="font-medium">Document type</label>
          <div className=" text-black flex">
            <Input
              type="radio"
              name="docType"
              value="NID"
              onChange={() => setDocType("NID")}
            />
            <label htmlFor="" className="mt-2 ml-2 mr-8">
              NID
            </label>
            <Input
              type="radio"
              name="docType"
              onChange={() => setDocType("PASSPORT")}
            />
            <label htmlFor="" className="ml-2 mt-2">
              Passport
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="font-medium">Document number</label>
          <Input
            type="text"
            name="docNumber"
            placeholder="Enter document number"
            value={docNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDocNumber(e.target.value)
            }
          />
        </div>

        <div className="">
          <label className="font-medium">Document image</label>
          <div className="rounded-lg border-2 border-green-700 flex items-center p-2 mt-2">
            <img src={attach} />
            <input
              type="file"
              name="image"
              className="opacity-0 absolute overflow-hidden -z-1"
              onChange={handleFileChange}
            />
            <div className="ml-2 text-sm text-green-700 font-medium">
              Upload document image
            </div>
          </div>
        </div>
        <Button type="submit">Submit Request</Button>
      </form>
    </div>
  );
}
