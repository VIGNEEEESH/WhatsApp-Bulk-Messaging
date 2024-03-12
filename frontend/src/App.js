import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import Pricing from "./screens/pricing";
import Contact from "./screens/contact";
import Login from "./screens/Login";
import Errorpage from "./screens/Errorpage";
import CDashboard from "./Dashboard/Cdashboard/Dashboard";
import ADashboard from "./Dashboard/Adashboard/Dashboard";
import AdminLogin from "./screens/AdminLogin";
import { useAuth } from "./components/auth-hook";
import { AuthContext } from "./Context/Auth-context";
function App({ qrCodeValue }) {
  const { token, login, logout, userId, role } = useAuth();
  console.log(role);
  let routes;
  if (role === "Admin") {
    routes = (
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/Adashboard" element={<ADashboard />} exact />
          {/* <Route path="/pricing" element={<Pricing />} exact /> */}
          {/* <Route path="/instructions" element={<Contact />} exact /> */}
          <Route path="/contact" element={<Contact />} exact />
          <Route path="/signin" element={<Login />} exact />

          <Route path="/Cdashboard" element={<CDashboard />} exact />
        </Routes>
      </React.Fragment>
    );
  } else if (role === "User") {
    routes = (
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} exact />
          {/* <Route path="/pricing" element={<Pricing />} exact /> */}
          {/* <Route path="/instructions" element={<Contact />} exact /> */}
          <Route path="/contact" element={<Contact />} exact />
          <Route path="/Cdashboard" element={<CDashboard />} exact />
        </Routes>
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} exact />
          {/* <Route path="/pricing" element={<Pricing />} exact /> */}
          {/* <Route path="/instructions" element={<Contact />} exact /> */}
          <Route path="/contact" element={<Contact />} exact />

          <Route path="/signin" element={<Login />} exact />
          <Route path="/adminlogin" element={<AdminLogin />} exact />
        </Routes>
      </React.Fragment>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        userId: userId,
        token: token,
        login: login,
        logout: logout,
        role: role,
      }}
    >
      <main>
        <BrowserRouter>{routes}</BrowserRouter>
        {/* Additional component to display the QR code */}
        {qrCodeValue && (
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              QR Code:
            </label>
            <img src={qrCodeValue} alt="QR Code" />
          </div>
        )}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
