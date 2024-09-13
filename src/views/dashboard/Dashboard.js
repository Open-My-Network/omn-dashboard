import React, { useEffect } from 'react';
import ProfileCard from './widgets/ProfileCard';
import ProfileTabBar from './widgets/ProfileTabBar';

// Utility function to get a specific cookie value
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const Dashboard = () => {
  // useEffect(() => {
  //   // Function to get query parameters from URL
  //   const getQueryParam = (name) => {
  //     const urlParams = new URLSearchParams(window.location.search);
  //     return urlParams.get(name);
  //   };

  //   // Extract token from URL
  //   const tokenFromUrl = getQueryParam('token');

  //   if (tokenFromUrl) {
  //     // Set cookie with token
  //     document.cookie = `jwt_token=${tokenFromUrl};path=/;max-age=${60 * 60 * 24 * 7}`; // 7 days expiry
  //   }

  //   // Check if token is present in cookies
  //   const token = getCookie('jwt_token');
    
  //   if (!token) {
  //     // Redirect to login page if token is not found
  //     window.location.href = 'https://site.openmynetwork.com/login-test';
  //   }
  // }, []);

  return (
    <div>
      <ProfileCard />
      <ProfileTabBar />
    </div>
  );
};

export default Dashboard;
