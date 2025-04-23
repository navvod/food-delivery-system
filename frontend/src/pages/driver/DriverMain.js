import React from 'react';
import DriverAvailabilityCard from '../../components/delivery/DriverAvailabilityCard';
import AssignedOrders from '../../components/delivery/AssignedOrders';
import DriverNavbar from '../../components/delivery/DriverNavbar';

const DriverMain = () => {
  return (
    <div>
         <DriverNavbar />
      <h1>Driver Dashboard</h1>
      <DriverAvailabilityCard />
      <AssignedOrders />
    </div>
  );
};

export default DriverMain;