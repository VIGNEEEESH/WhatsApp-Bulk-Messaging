// src/components/Content.js
import React from "react";
import AddAdmin from "./AddAdmin";
import AddUser from "./AddUser";

const Content = ({ page }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {page || "Dashboard"}
      </h2>
      <div className="bg-white p-6 rounded-md shadow-md">
        {/* Demo content for the selected page */}
        {page === "AddAdmin" && <AddAdmin />}
        {page === "Add User" && <AddUser />}
      </div>
    </div>
  );
};

export default Content;
