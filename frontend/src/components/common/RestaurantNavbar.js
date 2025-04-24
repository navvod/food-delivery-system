import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!', {
      position: 'top-right',
      autoClose: 2000,
    });
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm p-4 sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo/App Name */}
        <Link
          to="/"
          className="text-2xl font-semibold text-primary hover:text-primary-dark transition-colors duration-200"
        >
          Food Delivery
        </Link>

        {/* Hamburger Menu Button (Visible on Mobile) */}
        <button
          className="md:hidden text-secondary focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row items-center gap-4 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none`}
        >
          {user ? (
            <>
              {user.role === 'restaurant_admin' && (
                <>
                  <Link
                    to="/admin/dashboard"
                    className="text-secondary hover:text-primary transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/orders"
                    className="text-secondary hover:text-primary transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  <Link
                    to="/admin/register-restaurant"
                    className="text-secondary hover:text-primary transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register Restaurant
                  </Link>
                </>
              )}
              {user.role === 'customer' && (
                <Link
                  to="/restaurants"
                  className="text-secondary hover:text-primary transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Restaurants
                </Link>
              )}
              <Link
                to="/profile"
                className="text-secondary hover:text-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="px-3 py-1 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-secondary hover:text-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-secondary hover:text-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;