import React, { useEffect, useState } from "react"; // Import useState for managing loading state
import { Routes, Route } from "react-router-dom"; // Removed useNavigate since it's not being used
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie"; // Import js-cookie

import Loading from "./components/Loading";
import Notfound from "./views/NotFound/Notfound";
import HomePage from "./views/Home/pages/Homepage";
import UsersPage from "./views/Users/pages/UserPage";
import SchoolPage from "./views/Schools/pages/SchoolPage";
import PostPage from "./views/Post/pages/PostPage";
import Courses from "./views/Courses/pages/Courses";
import DevPlanPage from "./views/DevelopmentPlan/pages/DevelopmentPlanPage";

const App = () => {
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    // If token exists in the URL, set it as a cookie
    if (token) {
      Cookies.set("jwt_token", token); // Set the cookie with the name 'jwt_token'
    }

    // Check if the jwt_token cookie exists
    const jwtToken = Cookies.get("jwt_token");
    if (!jwtToken) {
      // Redirect to login if the cookie doesn't exist
      window.location.href = "https://openmynetwork.com/login"; // Use window.location.href for redirection
    } else {
      // If the token exists, set loading to false to render the main content
      setLoading(false);
    }
  }, []); // Empty dependency array to run only on component mount

  // Display a loading message or spinner while loading
  if (loading) {
    return <Loading/>; // You can customize this loading message or spinner
  }

  return (
    <>
      <Routes>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/schools" element={<SchoolPage />} />
        <Route path="/articles" element={<PostPage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/development-plan" element={<DevPlanPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
    </>
  );
};

export default App;
