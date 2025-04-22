import React, { useState } from 'react';
import { toast } from 'react-toastify';

const categories = [
  'Vegan',
  'Fusion',
  'Fast Food',
  'Healthy',
  'Chinese',
  'Japanese',
  'Thai',
  'Korean',
  'Indian',
  'Sri Lankan',
  'Desserts & Bakery',
  'Italian',
  'Street Food',
];

const RegisterRestaurantForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contact: '',
    cuisineType: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [contactError, setContactError] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);

  const phoneRegex = /^\+\d{1,3}\d{6,14}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'contact') {
      if (!phoneRegex.test(value)) {
        setContactError('Please enter a valid phone number (e.g., +94123456789)');
      } else {
        setContactError('');
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file.', {
          position: 'top-right',
          autoClose: 3000,
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size exceeds 5MB.', {
          position: 'top-right',
          autoClose: 3000,
        });
        return;
      }
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadLoading(true);

    if (!phoneRegex.test(formData.contact)) {
      toast.error('Please fix the phone number format before submitting.', {
        position: 'top-right',
        autoClose: 3000,
      });
      setUploadLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('contact', formData.contact);
      formDataToSend.append('cuisineType', formData.cuisineType);
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      await onSubmit(formDataToSend);
    } catch (err) {
      toast.error(err.message || 'Failed to register restaurant', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="contact">Contact</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
          placeholder="+94123456789"
        />
        {contactError && (
          <p>{contactError}</p>
        )}
      </div>
      <div>
        <label htmlFor="cuisineType">Cuisine Type</label>
        <select
          name="cuisineType"
          value={formData.cuisineType}
          onChange={handleChange}
          required
        >
          <option value="">Select Cuisine</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="image">Restaurant Image (optional)</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <button type="submit" disabled={uploadLoading}>
        {uploadLoading ? 'Uploading...' : 'Register'}
      </button>
    </form>
  );
};

export default RegisterRestaurantForm;