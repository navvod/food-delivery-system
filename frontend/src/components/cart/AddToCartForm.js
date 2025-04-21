import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { toast } from 'react-toastify';
import LoadingSpinner from '../common/LoadingSpinner';

const AddToCartForm = () => {
  const { addToCart, loading } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    restaurantId: '',
    itemId: '',
    itemName: '',
    description: '',
    price: '',
    quantity: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addToCart({
        restaurantId: formData.restaurantId,
        itemId: formData.itemId,
        itemName: formData.itemName,
        description: formData.description,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
      });
      toast.success('Item added to cart!');
      setFormData({
        restaurantId: '',
        itemId: '',
        itemName: '',
        description: '',
        price: '',
        quantity: 1,
      });
      navigate('/cart');
    } catch (error) {
      console.error('Add to cart error:', error.response?.data || error.message);
      toast.error(error.response?.data?.error || 'Failed to add to cart');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Item to Cart</h2>
      
      <div>
        <label>Restaurant ID</label>
        <input
          type="text"
          name="restaurantId"
          placeholder="Restaurant ID"
          value={formData.restaurantId}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Item ID</label>
        <input
          type="text"
          name="itemId"
          placeholder="Item ID"
          value={formData.itemId}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Item Name</label>
        <input
          type="text"
          name="itemName"
          placeholder="Item Name"
          value={formData.itemName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Price</label>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
      </div>

      <div>
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add to Cart'}
      </button>
    </form>
  );
};

export default AddToCartForm;