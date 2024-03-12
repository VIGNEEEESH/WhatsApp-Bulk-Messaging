// src/components/Sidebar.js
import React from "react";
import { CogIcon, LogoutIcon } from "@heroicons/react/solid";
import { FaHome, FaUser } from "react-icons/fa";
import { useAuth } from "../../components/auth-hook";
import { useNavigate } from "react-router-dom";
const Sidebar = ({ onPageClick }) => {
  const pages = [
    { name: "AddAdmin", icon: FaUser },
    { name: "Add User", icon: FaUser },
  ];
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.logout();
    setTimeout(() => {
      navigate("/signin");
    }, 5000);
  };

  return (
    <aside className="bg-gray-800 h-screen w-64 items-center justify-center">
      <div className="flex items-center justify-center mt-10">
        <span className="text-white text-2xl font-semibold">Bulk Messager</span>
      </div>
      <nav className="mt-10 items-center justify-center">
        {pages.map((page) => (
          <div
            key={page.name}
            onClick={() => onPageClick(page.name)}
            className="flex items-center cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white py-2 px-4"
          >
            <page.icon className="w-6 h-6 mr-2" />
            {page.name}
          </div>
        ))}
        <div className="flex items-center justify-center mt-10">
          <button
            type="button"
            className=" mr-3 text-white bg-customGreen hover:bg-customGreen focus:ring-4 focus:outline-none focus:ring-customGreen font-medium rounded-lg text-sm px-8 py-5 text-center inline-flex items-center dark:focus:ring-customGreen me-2 mb-2"
            onClick={handleLogout}
          >
            <LogoutIcon className="w-4 h-4 mr-2" />
            Log Out
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
