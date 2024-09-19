import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./views/Home/pages/Homepage";
import UsersPage from "./views/Users/pages/UserPage";
import SchoolPage from './views/Schools/pages/SchoolPage';
import PostPage from "./views/Post/pages/PostPage";
import DevPlanPage from "./views/DevelopmentPlan/pages/DevelopmentPlanPage";

const App = () => {
  return (
    <Router basename="">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/schools" element={<SchoolPage />} />
        <Route path="/articles" element={<PostPage />} />
        <Route path="/development-plan" element={<DevPlanPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
    </Router>
  );
};

export default App;
