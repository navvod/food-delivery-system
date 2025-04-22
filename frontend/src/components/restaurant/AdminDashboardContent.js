import React from 'react';
import Navbar from '../common/Navbar';

const AdminDashboardContent = ({ loading, error, restaurant, navigate }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <p>{error}</p>
        <button onClick={() => navigate('/admin/register-restaurant')}>
          Register a Restaurant
        </button>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <p>No restaurant found. Please register your restaurant.</p>
      <button onClick={() => navigate('/admin/register-restaurant')}>
        Register a Restaurant
      </button>
    </div>
  );
};

export default AdminDashboardContent;