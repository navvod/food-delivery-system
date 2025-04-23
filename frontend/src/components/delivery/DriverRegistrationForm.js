import React, { useState, useRef } from 'react';
import deliveryService from '../../services/deliveryService';

const DriverRegistrationForm = () => {
  const [formData, setFormData] = useState({
    mainLocation: '',
    vehicleRegNumber: '',
    mobileNumber: '',
  });
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const data = new FormData();
    data.append('mainLocation', formData.mainLocation);
    data.append('vehicleRegNumber', formData.vehicleRegNumber);
    data.append('mobileNumber', formData.mobileNumber);
    if (photo) {
      data.append('photo', photo);
    }

    try {
      const response = await deliveryService.registerDriver(data);
      setSuccess(response.message);
      setFormData({ mainLocation: '', vehicleRegNumber: '', mobileNumber: '' });
      setPhoto(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Reset file input
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h2>Register as a Driver</h2>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mainLocation">Main Location:</label>
          <input
            type="text"
            id="mainLocation"
            name="mainLocation"
            value={formData.mainLocation}
            onChange={handleChange}
            required
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
            required
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
            required
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default DriverRegistrationForm;