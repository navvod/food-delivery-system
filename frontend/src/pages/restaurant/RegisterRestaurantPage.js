import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import restaurantService from '../../services/restaurantService';
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

const RegisterRestaurantPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contact: '',
    cuisineType: '',
    image: '',
  });
  const [contactError, setContactError] = useState('');
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phoneRegex.test(formData.contact)) {
      toast.error('Please fix the phone number format before submitting.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await restaurantService.registerRestaurant(formData);
      console.log('Restaurant registration response:', response);
      toast.success('Restaurant registered successfully! Let’s add your first menu item.', {
        position: 'top-right',
        autoClose: 3000,
      });
      const targetUrl = `/restaurant/${response.restaurant._id}/add-menu`;
      console.log('Navigating to:', targetUrl);
      navigate(targetUrl);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Failed to register restaurant', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <Navbar />
      <main>
        <section>
          <h2>Register Restaurant</h2>
          <form onSubmit={handleSubmit}>
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
              <label htmlFor="image">Image URL (optional)</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/restaurant-image.jpg"
              />
            </div>
            <button type="submit">Register</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default RegisterRestaurantPage;