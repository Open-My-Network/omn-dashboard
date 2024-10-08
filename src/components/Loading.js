// src/components/Loading.js
import React from "react";
import { LinearProgress } from "@mui/material";
import "../Loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <img
        src="/images/loading.svg"
        alt="Loading"
        className="loading-image"
      />
      <LinearProgress className="loading-progress" />
    </div>
  );
};

export default Loading;
