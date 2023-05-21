import users from "../../assets/users.svg";

export default function Sidebar() {
  return (
    <div
      className="bg-green-50 md:w-1/5 w-1/2 h-screen fixed md:relative z-20 hidden md:block"
      id="sidebar"
    >
      <div className="text-sm mt-44">
        <div className="flex pl-10 py-2 border-l-4 border-l-green-700">
          <img src={users} className="w-5" />
          <div className="text-green-700 font-medium ml-4">Users</div>
        </div>
        <div className="flex pl-10 py-2 mt-4">
          <img src={users} className="w-5" />
          <div className="text-green-700 font-medium ml-4">Profile</div>
        </div>
      </div>
    </div>
  );
}
