import React from 'react';
import DriverDetails from '../../components/delivery/DriverDetails';
import DriverNavbar from '../../components/delivery/DriverNavbar';  


const DriverProfile = () => {
  return (
    <div>
        <DriverNavbar />
      <h1>Driver Profile</h1>
      
      <DriverDetails />
    </div>
  );
};

export default DriverProfile;