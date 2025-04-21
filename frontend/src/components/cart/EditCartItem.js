import { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';

const EditCartItem = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { cart, updateCartItem, fetchCart } = useContext(CartContext);

  const item = cart?.items?.find((i) => i.itemId === itemId);
  const [quantity, setQuantity] = useState(item ? item.quantity : 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('EditCartItem handleSubmit, quantity:', quantity, 'type:', typeof quantity);
    const parsedQuantity = Number(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity < 1) {
      toast.error('Please enter a valid quantity (minimum 1)');
      return;
    }
    try {
      await updateCartItem({ itemId, quantity: parsedQuantity });
      toast.success('Cart item updated successfully!');
      await fetchCart();
      navigate('/cart');
    } catch (error) {
      console.log('Update cart item error:', error.message);
      toast.error(error.message || 'Failed to update cart item');
    }
  };

  if (!item) {
    return <p>Item not found in cart.</p>;
  }

  const total = item.price * (Number(quantity) || 1);

  return (
    <div>
      <h2>Edit Cart Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Item:</label>
          <span>{item.itemName}</span>
        </div>
        <div>
          <label>Price:</label>
          <span>${item.price}</span>
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={(e) => {
              const value = e.target.value;
              setQuantity(value === '' ? '' : Number(value) || 1);
            }}
            min="1"
            required
          />
        </div>
        <div>
          <label>Total:</label>
          <span>${total.toFixed(2)}</span>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditCartItem;