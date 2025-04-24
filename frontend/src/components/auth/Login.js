import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password); // Get the response from login
      toast.success('Logged in successfully!');

      // Determine redirect based on user role from the response
      const role = response.user?.role; // Access role directly from response
      if (role === 'customer') {
        navigate('/customer-profile');
      } else if (role === 'delivery_personnel') {
        navigate('/driver-main');
      } else if (role === 'restaurant_admin') {
        navigate('/admin/dashboard');
      } else {
        // Fallback if role is not recognized
        navigate('/profile');
      }
    } catch (error) {
      toast.error(error.message || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;