import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import restaurantService from '../../services/restaurantService';
import { toast } from 'react-toastify';
import Navbar from '../../components/common/Navbar';

const EditMenuItemPage = () => {
  const { restaurantId, itemId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const item = await restaurantService.getMenuItem(restaurantId, itemId);
        setFormData({
          name: item.name,
          description: item.description || '',
          price: item.price,
          category: item.category,
          image: item.image || '',
        });
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch menu item');
        setLoading(false);
      }
    };
    fetchMenuItem();
  }, [restaurantId, itemId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateMenuItem = async (e) => {
    e.preventDefault();
    try {
      const updatedItem = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        image: formData.image || undefined,
      };
      await restaurantService.updateMenuItem(restaurantId, itemId, updatedItem);
      toast.success('Menu item updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate(`/restaurant/${restaurantId}/dashboard`);
    } catch (err) {
      toast.error(err.message || 'Failed to update menu item', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Navbar />
      <section>
        <h2>Edit Menu Item</h2>
        <form onSubmit={handleUpdateMenuItem}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Price</label>
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
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Image URL (optional)</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Update Menu Item</button>
        </form>
        <button onClick={() => navigate(`/restaurant/${restaurantId}/dashboard`)}>
          Back to Dashboard
        </button>
      </section>
    </div>
  );
};

export default EditMenuItemPage;