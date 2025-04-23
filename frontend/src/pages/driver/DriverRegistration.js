import React from 'react';
import DriverRegistrationForm from '../../components/delivery/DriverRegistrationForm';
import DriverNavbar from '../../components/delivery/DriverNavbar';  
const DriverRegistration = () => {
  return (
    <div>
         <DriverNavbar />
      <h1>Driver Registration</h1>

      <DriverRegistrationForm />
    </div>
  );
};

export default DriverRegistration;