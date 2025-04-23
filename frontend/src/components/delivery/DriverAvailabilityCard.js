import React, { useState, useEffect } from 'react';
import deliveryService from '../../services/deliveryService';

const DriverAvailabilityCard = () => {
  const [isAvailable, setIsAvailable] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch driver details to get the initial availability status
  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        const data = await deliveryService.getDriverDetails();
        setIsAvailable(data.isAvailable);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };

    fetchDriverDetails();
  }, []);

  const handleToggle = async () => {
    const newAvailability = !isAvailable;
    setError(null);
    setSuccess(null);

    try {
      const response = await deliveryService.updateAvailabilityStatus(newAvailability);
      setIsAvailable(newAvailability);
      setSuccess(response.message);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  if (isAvailable === null && !error) {
    return <p>Loading availability...</p>;
  }

  return (
    <div>
      <h2>Driver Availability</h2>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      <p>Status: {isAvailable ? 'Available' : 'Unavailable'}</p>
      <button onClick={handleToggle}>
        Toggle Availability ({isAvailable ? 'Off' : 'On'})
      </button>
    </div>
  );
};

export default DriverAvailabilityCard;