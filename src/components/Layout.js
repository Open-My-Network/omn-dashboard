import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

import { CssBaseline, Toolbar } from "@mui/material";
const Layout = ({children}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Function to toggle the sidebar open/close
  const handleDrawerToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <Sidebar isOpen={isSidebarOpen} />
      <main style={{ flexGrow: 1, padding: '50px' }}> 
        <Toolbar />
        {children}
      </main>
    </div>
  );
};

export default Layout;

