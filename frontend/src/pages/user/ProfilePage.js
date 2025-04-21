// src/pages/ProfilePage.js
import React from 'react';
import Navbar from '../../components/common/Navbar';
import Profile from '../../components/auth/Profile';
import PaymentMethods from '../../components/payment/PaymentMethods';

const ProfilePage = () => {
  return (
    <div>
      <Navbar />
      <Profile />
      <PaymentMethods />
    </div>
  );
};

export default ProfilePage;