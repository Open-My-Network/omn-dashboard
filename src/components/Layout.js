import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { CssBaseline, Toolbar } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <Navbar /> 
      <Sidebar />
      <main style={{ flexGrow: 1, padding: '50px' }}> 
        <Toolbar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
