import CloseButton from "../atoms/CloseButton";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyAccount } from "../../services";
import { changeToVerified, setRequest } from "../../store/reducers/userSlice";

export default function ViewRequest({
  setView,
  request,
}: {
  setView: any;
  request: any;
}) {
  const dispatch = useDispatch();

  const handleVerify = (id: string) => {
    verifyAccount(id)
      .then((_res) => {
        dispatch(setRequest(null));
        dispatch(changeToVerified(_res.data.data.id));
        setView(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="mt-4 max-w-md p-10 mx-auto bg-white shadow-xl shadow-neutral-100 flex flex-col">
      <div className="flex justify-between items-center">
        <div className="font-bold text-2xl">View Verification Request</div>
        <CloseButton onClick={() => setView(false)} />
      </div>
      <form className="mt-8 relative">
        <div className="mt-5">
          <div className="text-base text-gray-500">Document Type</div>
          <div className="text-sm">{request.type}</div>
        </div>
        <div className="mt-3">
          <div className="text-base text-gray-500">Document Number</div>
          <div className="text-sm">{request.number}</div>
        </div>
        <div className="mt-3">
          <div className="text-base text-gray-500">Document Image</div>
          <img
            src={request.image}
            alt="profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="flex space-x-5 mt-5">
          <Button type="button" cancel>
            Reject verification
          </Button>
          <Button type="button" onClick={() => handleVerify(request.userId)}>
            Verify Account
          </Button>
        </div>
      </form>
    </div>
  );
}
