import React from "react";
import WhatsApp from "./WhatsApp";

const Content = ({ page }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{page}</h2>
      <div className="bg-white p-6 rounded-md shadow-md">
        {page === "WhatsApp" && <WhatsApp />}
      </div>
    </div>
  );
};

export default Content;
