import React from "react";
import { Link } from "react-router-dom";

import Layout from "../../components/Layout";
import "./NotFound.css";

export default function Notfound() {
  return (
    <Layout>
      <div className="notfound-container">
        <img
          src="/images/not_found.svg"
          alt="Page not found"
          className="notfound-image"
        />
        <h1>404 - Page Not Found</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <div className="notfound-buttons">
          <Link to="/" className="btn-home">
            Go to Homepage
          </Link>
          <button className="btn-back" onClick={() => window.history.back()}>
            Go Back
          </button>
        </div>
      </div>
    </Layout>
  );
}
