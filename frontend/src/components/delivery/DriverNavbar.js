import React from 'react';
import { Link } from 'react-router-dom';

const DriverNavbar = () => {
  return (
    <nav>
      <h1>Driver Portal</h1>
      <ul>
        <li>
          <Link to="/driver-profile">Driver Profile</Link>
        </li>
        <li>
          <Link to="/driver-registration">Driver Registration</Link>
        </li>
      </ul>
    </nav>
  );
};

export default DriverNavbar;