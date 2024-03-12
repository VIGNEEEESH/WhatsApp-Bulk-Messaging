import { message } from "antd";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "../../components/auth-hook";
const AddAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const auth = useContext(useAuth);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation logic can be added here

    const formData = {
      email: email,
      password: password,
      role: "Admin",
    };

    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "/api/bulkmessage/admin/create/admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Handle success, e.g., redirect or show a success message
        console.log("Admin added successfully");
        message.success("Admin added successfully");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        // Handle error, e.g., display an error message
        console.error("Failed to add admin");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Add an Admin
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required=""
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              <button
                type="submit"
                className="w-full text-black bg-customGreen hover:bg-customGreenDark focus:ring-4 focus:outline-none focus:ring-customGreenLight font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-customGreenDark"
              >
                Add Admin
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddAdmin;
