// src/pages/LoginPage.js
import React from 'react';
import Navbar from '../../components/common/Navbar';
import Login from '../../components/auth/Login';

const LoginPage = () => {
  return (
    <div>
      <Navbar />
      <Login />
    </div>
  );
};

export default LoginPage;