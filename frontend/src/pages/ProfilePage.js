// src/pages/ProfilePage.js
import React from 'react';
import Navbar from '../components/common/Navbar';
import Profile from '../components/auth/Profile';

const ProfilePage = () => {
  return (
    <div>
      <Navbar />
      <Profile />
    </div>
  );
};

export default ProfilePage;