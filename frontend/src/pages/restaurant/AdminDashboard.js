import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import restaurantService from '../../services/restaurantService';
import Navbar from '../../components/common/Navbar';

const AdminDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user || user.role !== 'restaurant_admin') {
      console.log('AdminDashboard: Not authorized, redirecting to /restaurants');
      console.log('AdminDashboard: user=', user);
      toast.error('You are not authorized to access this page.');
      navigate('/restaurants');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await restaurantService.getRestaurantDetails();
        setRestaurant(response.restaurant);
        if (response.restaurant) {
          navigate(`/restaurant/${response.restaurant._id}/dashboard`);
        }
        setLoading(false);
      } catch (error) {
        setError(error.message || 'Failed to fetch restaurant details');
        setLoading(false);
      }
    };
    fetchRestaurantDetails();
  }, [navigate]);

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

export default AdminDashboard;