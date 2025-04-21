import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { OrderContext } from '../../context/OrderContext';
import { toast } from 'react-toastify';

const CreateOrder = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const { createOrder } = useContext(OrderContext);

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [fromAddress, setFromAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePlaceOrder = async () => {
    if (!deliveryAddress || !fromAddress || !phoneNumber) {
      toast.error('Please fill in all fields: Delivery address, from address, and phone number are required');
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast.error('Phone number must be exactly 10 digits');
      return;
    }

    try {
      const orderData = {
        deliveryAddress,
        fromAddress,
        phoneNumber,
      };
      await createOrder(orderData);
      toast.success('Order placed successfully!');
      navigate('/orders/active');
    } catch (error) {
      console.log('Place order error:', error.message);
      toast.error(error.message || 'Failed to place order');
    }
  };

  if (!cart || cart.items.length === 0) {
    return <p>Your cart is empty. Please add items to your cart before placing an order.</p>;
  }

  return (
    <div>
      <div>
        <div>
          <h2>Review Your Order</h2>
          <div>
            {cart.items.map((item) => (
              <div key={item.itemId}>
                <h3>{item.itemName}</h3>
                <p>{item.description}</p>
                <div>
                  <span>Price:</span>
                  <span>${item.price}</span>
                </div>
                <div>
                  <span>Quantity:</span>
                  <span>{item.quantity}</span>
                </div>
                <div>
                  <span>Total:</span>
                  <span>${item.amount}</span>
                MURAD
                </div>
              </div>
            ))}
            <h3>
              Total Amount: ${cart.totalAmount || cart.items.reduce((sum, item) => sum + item.amount, 0)}
            </h3>
          </div>
        </div>

        <div>
          <h2>Order Details</h2>
          <div>
            <label>Delivery Address:</label>
            <input
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Enter delivery address"
              required
            />

            <label>From Address:</label>
            <input
              type="text"
              value={fromAddress}
              onChange={(e) => setFromAddress(e.target.value)}
              placeholder="Enter from address"
              required
            />

            <label>Phone Number:</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter 10-digit phone number"
              required
            />
          </div>

          <div>
            <button onClick={() => navigate('/cart')}>Back to Cart</button>
            <button onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;