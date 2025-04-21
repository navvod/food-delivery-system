import React from 'react';
import Navbar from '../../components/common/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <main>
        <h1>Welcome to Food Delivery App</h1>
        <p>Order your favorite meals from local restaurants!</p>
      </main>
    </div>
  );
};

export default Home;