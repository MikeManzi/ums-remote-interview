import { useSelector } from "react-redux";
import Sidebar from "../components/organisms/Sidebar";
import TopBar from "../components/organisms/TopBar";
import Users from "../components/organisms/Users";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { currentUser } = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    sidebar?.classList.toggle("hidden");
    overlay?.classList.toggle("hidden");
  };

  useEffect(() => {
    if (currentUser.user) {
      if (currentUser.user.role !== "ADMIN") navigate("/");
    } else {
      navigate("/sign-in");
    }
  }, []);

  return (
    <div className="flex h-screen relative">
      <Sidebar />
      <div className="md:w-4/5 w-full pt-4 px-6 pb-6">
        <TopBar toggleSidebar={toggleSidebar} />
        <Users />
      </div>
      <div
        id="overlay"
        onClick={toggleSidebar}
        className="bg-black bg-opacity-60 fixed w-full h-full hidden z-10"
      ></div>
    </div>
  );
}
