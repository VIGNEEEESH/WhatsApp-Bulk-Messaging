import React, { useState } from "react";
import { CogIcon, LogoutIcon } from "@heroicons/react/solid";
import { FaWhatsapp, FaHome } from "react-icons/fa";
import { useAuth } from "../../components/auth-hook";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Sidebar = ({ onPageClick }) => {
  const pages = [{ name: "WhatsApp", icon: FaWhatsapp }];
  const auth = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await auth.logout();
      setTimeout(() => {
        navigate("/signin");
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error during logout:", error.message);
    } finally {
      setLoggingOut(false);
    }
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
            className={`mr-3 text-white bg-customGreen hover:bg-customGreen focus:ring-4 focus:outline-none focus:ring-customGreen font-medium rounded-lg text-sm px-8 py-5 text-center inline-flex items-center dark:focus:ring-customGreen me-2 mb-2 ${
              loggingOut ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? (
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />}
              />
            ) : (
              <>
                <LogoutIcon className="w-4 h-4 mr-2" />
                Log Out
              </>
            )}
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
