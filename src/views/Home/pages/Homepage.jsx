import React from 'react';
import Layout from '../../../components/Layout';

const HomePage = () => (
  <Layout>
    <h1>Home Page</h1>
    <p>HOST - {process.env.HOST}</p>
  </Layout>
);

export default HomePage;
