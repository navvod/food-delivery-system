import React, { useState, useEffect, useRef } from 'react';
import deliveryService from '../../services/deliveryService';

const DriverDetails = () => {
  const [driver, setDriver] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    mainLocation: '',
    vehicleRegNumber: '',
    mobileNumber: '',
  });
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch driver details on component mount
  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        const data = await deliveryService.getDriverDetails();
        setDriver(data);
        setFormData({
          mainLocation: data.mainLocation || '',
          vehicleRegNumber: data.vehicleRegNumber || '',
          mobileNumber: data.mobileNumber || '',
        });
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };

    fetchDriverDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError(null);
    setSuccess(null);
    setPhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset file input when toggling
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const data = new FormData();
    if (formData.mainLocation) data.append('mainLocation', formData.mainLocation);
    if (formData.vehicleRegNumber) data.append('vehicleRegNumber', formData.vehicleRegNumber);
    if (formData.mobileNumber) data.append('mobileNumber', formData.mobileNumber);
    if (photo) data.append('photo', photo);

    try {
      const response = await deliveryService.updateDriverDetails(data);
      setDriver(response.driver);
      setSuccess(response.message);
      setIsEditing(false);
      setPhoto(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Reset file input
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  if (!driver && !error) {
    return <p>Loading driver details...</p>;
  }

  return (
    <div>
      <h2>Driver Details</h2>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      {!isEditing ? (
        <div>
          <p>Main Location: {driver?.mainLocation || 'N/A'}</p>
          <p>Vehicle Registration Number: {driver?.vehicleRegNumber || 'N/A'}</p>
          <p>Mobile Number: {driver?.mobileNumber || 'N/A'}</p>
          {driver?.photo ? (
            <p>Photo: {driver.photo}</p>
          ) : (
            <p>Photo: Not uploaded</p>
          )}
          <button onClick={handleEditToggle}>Edit</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="mainLocation">Main Location:</label>
            <input
              type="text"
              id="mainLocation"
              name="mainLocation"
              value={formData.mainLocation}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="vehicleRegNumber">Vehicle Registration Number:</label>
            <input
              type="text"
              id="vehicleRegNumber"
              name="vehicleRegNumber"
              value={formData.vehicleRegNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Photo (Optional):</label>
            <input
              type="file"
              id="photo"
              name="photo"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <button type="button" onClick={handleUploadClick}>
              Upload Photo
            </button>
            {photo && <p>Selected file: {photo.name}</p>}
          </div>
          <button type="submit">Update</button>
          <button type="button" onClick={handleEditToggle}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default DriverDetails;