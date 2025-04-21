import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateCartItem, deleteCartItem, fetchCart } = useContext(CartContext);

  console.log('Cart.js rendering, cart:', cart);

  const handleUpdate = async (itemId, newQuantity) => {
    try {
      await updateCartItem({ itemId, quantity: newQuantity });
      toast.success('Cart updated successfully!');
      await fetchCart();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await deleteCartItem(itemId);
      toast.success('Item removed from cart!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!cart || cart.items.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  const calculatedTotalAmount = cart.items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div>
      {cart.items.map((item) => (
        <div key={item.itemId}>
          <div>
            <h3>{item.itemName}</h3>
            <p>{item.description}</p>
            <div>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${item.amount}</p>
            </div>
          </div>
          <div>
            <button onClick={() => navigate(`/cart/edit/${item.itemId}`)}>
              Change
            </button>
            <button onClick={() => handleDelete(item.itemId)}>
              Delete
            </button>
          </div>
        </div>
      ))}
      <h3>Total Amount: ${cart.totalAmount || calculatedTotalAmount}</h3>
    </div>
  );
};

export default Cart;