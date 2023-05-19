import { useSelector, useDispatch } from "react-redux";
import logoutIcon from "../../assets/logout.svg";
import menu from "../../assets/menu.svg";
import { logout } from "../../store/reducers/userSlice";
import { useNavigate } from "react-router-dom";

export default function TopBar({ toggleSidebar }: any) {
  const { currentUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between w-full items-center">
      <div
        className="bg-slate-200 rounded px-1 w-8 h-6 flex items-center justify-center md:hidden"
        onClick={toggleSidebar}
      >
        <img src={menu} alt="Icon" className="" />
      </div>
      <div className="flex items-center">
        <img
          src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-4">
          <div className="font-medium text-lg mt-1">Welcome back,</div>
          <div className="text-gray-400 text-sm">{currentUser.user.firstName} {currentUser.user.lastName}</div>
        </div>
      </div>
      <div className="flex items-center cursor-pointer" onClick={() => (dispatch(logout()), navigate("/sign-in"))}>
        <img
          src={logoutIcon}
          alt="Icon"
          className="w-4 "
        />
        <div className="text-sm ml-4 text-green-700 hidden md:block">
          Log Out
        </div>
      </div>
    </div>
  );
}
