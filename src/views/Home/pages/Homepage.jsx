import React from "react";
import Layout from "../../../components/Layout";
import '../css/Homepage.css';

const HomePage = () => (
  <Layout>
    <h3>Good Evening, Abishek Khanal</h3>
    <div class="quote-container">
      <blockquote class="quote">
        "The only limit to our realization of tomorrow is our doubts of today."
      </blockquote>
      <cite class="author">- Franklin D. Roosevelt</cite>
    </div>
  </Layout>
);

export default HomePage;
