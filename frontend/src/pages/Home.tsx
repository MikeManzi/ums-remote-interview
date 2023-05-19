import notification from "../assets/notification.svg";
import logoutIcon from "../assets/logout.svg";
import verify from "../assets/verify.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/reducers/userSlice";

export default function Home() {
  const { currentUser } = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const capitalize = (d: string) => d.charAt(0).toUpperCase() + d.slice(1);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/sign-in");
    }
  }, []);
  return (
    <>
      {currentUser.user && (
        <div className="bg-green-50 bg-opacity-20 flex flex-col justify-center w-full h-screen">
          <div className="md:w-3/5 w-4/5 mx-auto flex items-center bg-white custom-shadow shadow-neutral-200 justify-between py-4 px-8 rounded-xl">
            <div>
              <div className="text-gray-400 text-sm">Welcome back,</div>
              <div className="font-bold text-lg mt-1">
                {currentUser.user.firstName} {currentUser.user.lastName}
              </div>
            </div>
            <div className="flex space-x-3">
              <img
                src={notification}
                alt="Icon"
                className="w-4 cursor-pointer"
              />
              <img
                src={logoutIcon}
                alt="Icon"
                className="w-4 cursor-pointer"
                onClick={() => (dispatch(logout()), navigate("/sign-in"))}
              />
            </div>
          </div>
          <div className="bg-white custom-shadow shadow-neutral-200 justify-between py-6 px-8 rounded-xl md:w-2/5 w-4/5 mx-auto mt-10">
            <div className="flex items-center">
              <div
                className={`w-14 h-14 rounded-full border-2 ${
                  currentUser.user.status === "VERIFIED" && "border-green-700"
                } p-1`}
              >
                <img
                  src={`http://localhost:4000/uploads/profiles/${currentUser.user.profile}`}
                  alt="profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div
                className="ml-4 cursor-pointer"
                onClick={() =>
                  currentUser.user.status === "UNVERIFIED" &&
                  navigate("/request-verification")
                }
              >
                <div
                  className={`${
                    currentUser.user.status === "VERIFIED"
                      ? "bg-green-700"
                      : currentUser.user.status === "UNVERIFIED"
                      ? "bg-red-500"
                      : "bg-orange-400"
                  } flex items-center py-1 px-1.5 rounded-full`}
                >
                  {currentUser.user.status === "VERIFIED" && (
                    <img src={verify} alt="" className="w-4 h-4" />
                  )}
                  <div className="text-white text-xs font-medium ml-1">
                    {capitalize(currentUser.user.status.toLowerCase())}
                  </div>
                </div>
              </div>
            </div>
            <div className="font-medium">
              <div className="mt-5">
                <div className="text-base">
                  {currentUser.user.firstName} {currentUser.user.lastName}
                </div>
                <div className="text-sm text-gray-500">
                  {currentUser.user.email}
                </div>
              </div>
              <div className="mt-5">
                <div className="text-base text-gray-500">Gender</div>
                <div className="text-sm">{currentUser.user.gender}</div>
              </div>
              <div className="flex">
                <div className="mt-5">
                  <div className="text-base text-gray-500">Date of Birth</div>
                  <div className="text-sm">
                    {currentUser.user.dateOfBirth.split("T")[0]}
                  </div>
                </div>
                <div className="mt-5 ml-20">
                  <div className="text-base text-gray-500">Age</div>
                  <div className="text-sm">
                    {new Date().getFullYear() -
                      new Date(currentUser.user.dateOfBirth).getFullYear()}
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <div className="text-base text-gray-500">Martial Status</div>
                <div className="text-sm">{currentUser.user.maritalStatus}</div>
              </div>
              <div className="mt-5">
                <div className="text-base text-gray-500">Nationality</div>
                <div className="text-sm">{currentUser.user.nationality}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
