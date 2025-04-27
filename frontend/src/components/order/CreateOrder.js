import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { OrderContext } from '../../context/OrderContext';
import { toast } from 'react-toastify';
import paymentService from '../../services/paymentService';

const CreateOrder = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const { createOrder } = useContext(OrderContext);

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [fromAddress, setFromAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cards, setCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState('');
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch cards on mount
  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const data = await paymentService.getCards();
        setCards(data);
        if (data.length > 0) {
          setSelectedCardId(data[0]._id); // Pre-select the first card
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

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

    if (!selectedCardId) {
      toast.error('Please select a payment card');
      return;
    }

    try {
      const orderData = {
        deliveryAddress,
        fromAddress,
        phoneNumber,
      };
      const response = await createOrder(orderData);
      setOrderId(response.order._id); // Assuming createOrder returns the created order with an _id
      toast.success('Order placed successfully! Please proceed with payment.');
    } catch (error) {
      console.log('Place order error:', error.message);
      toast.error(error.message || 'Failed to place order');
    }
  };

  const handlePayment = async () => {
    if (!orderId) {
      toast.error('No order placed yet');
      return;
    }

    const totalAmount = cart.totalAmount || cart.items.reduce((sum, item) => sum + item.amount, 0);

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const paymentData = {
        orderId,
        amount: totalAmount,
        cardId: selectedCardId,
      };

      const response = await paymentService.processPayment(paymentData);
      setSuccess(response.message);
      toast.success('Payment processed successfully!');
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      toast.error(err.response?.data?.message || 'Failed to process payment');
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <p className="text-lg text-secondary">
          Your cart is empty. Please add items to your cart before placing an order.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Review Your Order Section (Left) */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-secondary mb-4">Review Your Order</h2>
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div key={item.itemId} className="border-b border-gray-200 pb-5">
                <h3 className="text-lg font-semibold text-secondary">{item.itemName}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-secondary">Price:</span>
                  <span className="text-sm text-secondary">${item.price}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-secondary">Quantity:</span>
                  <span className="text-sm text-secondary">{item.quantity}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-secondary font-semibold">Total:</span>
                  <span className="text-sm text-secondary font-semibold">${item.amount}</span>
                </div>
              </div>
            ))}
            <h3 className="text-lg font-bold text-secondary mt-4">
              Total Amount: ${cart.totalAmount || cart.items.reduce((sum, item) => sum + item.amount, 0)}
            </h3>
          </div>
        </div>

        {/* Order Details Section (Right) */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-secondary mb-4">Order Details</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="deliveryAddress" className="block text-sm font-medium text-secondary">
                Delivery Address
              </label>
              <input
                id="deliveryAddress"
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Enter delivery address"
                required
                className="w-full px-3 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="fromAddress" className="block text-sm font-medium text-secondary">
                From Address
              </label>
              <input
                id="fromAddress"
                type="text"
                value={fromAddress}
                onChange={(e) => setFromAddress(e.target.value)}
                placeholder="Enter from address"
                required
                className="w-full px-3 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-secondary">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter 10-digit phone number"
                required
                className="w-full px-3 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Payment Card Selection */}
            <div className="space-y-2">
              <label htmlFor="paymentCard" className="block text-sm font-medium text-secondary">
                Select Payment Card
              </label>
              {loading ? (
                <p>Loading cards...</p>
              ) : cards.length === 0 ? (
                <p>No cards found. Please add a card.</p>
              ) : (
                <select
                  id="paymentCard"
                  value={selectedCardId}
                  onChange={(e) => setSelectedCardId(e.target.value)}
                  className="w-full px-3 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a card</option>
                  {cards.map((card) => (
                    <option key={card._id} value={card._id}>
                      {card.brand} ending in {card.last4}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => navigate('/cart')}
                className="flex-1 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition-colors duration-200"
              >
                Back to Cart
              </button>
              {!orderId ? (
                <button
                  onClick={handlePlaceOrder}
                  className="flex-1 bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors duration-200"
                >
                  Place Order
                </button>
              ) : (
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
                >
                  {loading ? 'Processing...' : 'Pay Now'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;