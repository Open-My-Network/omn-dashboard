import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./middleware/ProtectionRoute";
import HomePage from "./views/Home/pages/Homepage";
import UsersPage from "./views/Users/pages/UserPage";
import SchoolPage from "./views/Schools/pages/SchoolPage";
import PostPage from "./views/Post/pages/PostPage";
import Courses from "./views/Courses/pages/Courses";
import DevPlanPage from "./views/DevelopmentPlan/pages/DevelopmentPlanPage";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there is a token in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Store the token in localStorage (or sessionStorage)
      localStorage.setItem("jwt_token", token);

      // Optionally remove the token from the URL to avoid showing it
      navigate(window.location.pathname, { replace: true });
    } else {
      // If no token is found, check if it's stored
      const storedToken = localStorage.getItem("jwt_token");
      if (!storedToken) {
        // Redirect to the external login page if no token is found
        window.location.href = "https://openmynetwork.com/login";
      }
    }
  }, [navigate]);

  return (
    <Routes>
      <ProtectedRoute path="/users" element={<UsersPage />} />
      <ProtectedRoute path="/schools" element={<SchoolPage />} />
      <ProtectedRoute path="/articles" element={<PostPage />} />
      <ProtectedRoute path="/courses" element={<Courses />} />
      <ProtectedRoute path="/development-plan" element={<DevPlanPage />} />
      <ProtectedRoute path="/" element={<HomePage />} />
      <Route
        path="/login"
        element={() => {
          window.location.href = "https://openmynetwork.com/login";
          return null;
        }}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
    </Routes>
  );
};

export default App;
