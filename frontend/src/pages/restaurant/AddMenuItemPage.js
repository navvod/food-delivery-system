import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import restaurantService from '../../services/restaurantService';
import { toast } from 'react-toastify';
import Navbar from '../../components/common/Navbar';
import useAuth from '../../hooks/useAuth';

const menuCategories = [
  'Main Course',
  'Appetizers',
  'Desserts',
  'Beverages',
  'Sides',
  'Snacks',
];

const AddMenuItemPage = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Main Course',
    image: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user || user.role !== 'restaurant_admin') {
      toast.error('You are not authorized to access this page.', {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate('/restaurants');
    } else {
      setLoading(false);
    }
  }, [user, authLoading, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    try {
      const menuItemData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        image: formData.image || undefined,
      };
      await restaurantService.addMenuItem(restaurantId, menuItemData);
      toast.success('Menu item added successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate(`/restaurant/${restaurantId}/dashboard`);
    } catch (err) {
      console.error('Add menu item error:', err);
      toast.error(err.message || 'Failed to add menu item', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <section>
        <h2>Add New Menu Item</h2>
        <form onSubmit={handleAddMenuItem}>
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
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {menuCategories.map((category) => (
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
              placeholder="https://example.com/menu-item-image.jpg"
            />
          </div>
          <button type="submit">Add Menu Item</button>
        </form>
        <button onClick={() => navigate(`/restaurant/${restaurantId}/dashboard`)}>
          Back to Dashboard
        </button>
      </section>
    </div>
  );
};

export default AddMenuItemPage;