import React, { useContext, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAuth } from "../components/auth-hook";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/Auth-context";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting the request

    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/bulkmessage/admin/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response);
      let expirationDate = new Date();
      // Assuming the response structure includes a success property
      if (response.status == 200) {
        auth.login(
          response.data.userId,
          response.data.email,
          response.data.token,
          response.data.role,
          expirationDate
        );
        console.log("Login successful");
        message.success("Logged in successfully");
        setTimeout(() => {
          navigate("/Adashboard");
        }, 3000);
        // Redirect or perform any action after successful login
      } else {
        console.error("Login failed:", response.data.message);
        // Handle login failure, show error message, etc.
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-gray-50 mt-10">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in to your account
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
                <div className="flex items-center justify-between">
                  {/* ... (unchanged code for the remember me checkbox and forgot password link) */}
                </div>
                <button
                  type="submit"
                  className="w-full text-black bg-customGreen hover:bg-opacity-80 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {loading ? (
                    <Spin
                      indicator={
                        <LoadingOutlined style={{ fontSize: 24 }} spin />
                      }
                    />
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AdminLogin;
