import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { toast } from 'react-toastify';
import LoadingSpinner from '../common/LoadingSpinner';

const AddToCartForm = () => {
  const { addToCart, loading } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize formData with default values
  const [formData, setFormData] = useState({
    restaurantId: '',
    itemId: '',
    itemName: '',
    description: '',
    price: '',
    quantity: 1,
  });

  // Populate formData with data from navigation state
  useEffect(() => {
    const { restaurantId, itemId, itemName, description, price } = location.state || {};
    if (restaurantId && itemId && itemName && price) {
      setFormData({
        restaurantId: restaurantId || '',
        itemId: itemId || '',
        itemName: itemName || '',
        description: description || '',
        price: price ? price.toString() : '',
        quantity: 1,
      });
    } else {
      toast.error('Missing item details. Please select an item to add to cart.');
      navigate('/'); // Redirect to home or menu page if data is missing
    }
  }, [location.state, navigate]);

  // Only allow quantity to be changed
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'quantity') {
      setFormData({ ...formData, [name]: value });
    }
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
      navigate('/cart'); // Redirect to cart view page
    } catch (error) {
      console.error('Add to cart error:', error.response?.data || error.message);
      toast.error(error.response?.data?.error || 'Failed to add to cart');
    }
  };

  // Format price in LKR (similar to MenuItem.js)
  const formatPrice = (price) => {
    return `LKR ${parseFloat(price).toLocaleString('en-LK', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  if (loading) return <LoadingSpinner />;

  return (
    <form onSubmit={handleSubmit}>
      {/* Use itemName as the header */}
      <h2>{formData.itemName}</h2>

      {/* Display description as a subheading */}
      <p>{formData.description || 'No description available'}</p>

      {/* Display price as a subheading */}
    
      <p>{formData.price ? formatPrice(formData.price) : 'Price not available'}</p>

      {/* Quantity input field */}
      <div>
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
          required
          placeholder="Quantity"
        />
      </div>

      {/* Button with dynamic quantity text */}
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : `Add ${formData.quantity} to cart`}
      </button>
    </form>
  );
};

export default AddToCartForm;