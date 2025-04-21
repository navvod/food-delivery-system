import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../../context/OrderContext';
import { toast } from 'react-toastify';

const ActiveOrders = () => {
  const { activeOrders, getActiveOrders, loading } = useContext(OrderContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('ActiveOrders useEffect triggered');
    const fetchActiveOrders = async () => {
      try {
        console.log('Calling getActiveOrders...');
        await getActiveOrders();
        console.log('getActiveOrders completed');
      } catch (error) {
        console.error('Error fetching active orders:', error.message);
        toast.error('Failed to fetch active orders');
      }
    };
    fetchActiveOrders();
  }, [getActiveOrders]);

  console.log('ActiveOrders rendering, loading:', loading, 'activeOrders:', activeOrders);

  const today = new Date('2025-04-20');
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (loading) {
    return <div>Loading active orders...</div>;
  }

  if (!activeOrders || activeOrders.length === 0) {
    return <div>No active orders found.</div>;
  }

  return (
    <div>
      <p>{formattedDate}</p>
      <h2>Your Active Orders</h2>
      {activeOrders.map((order) => (
        <div key={order._id}>
          <div>
            <h3>Order ID: {order._id}</h3>
            <div>
              <span>Total Amount:</span>
              <span>${order.totalAmount}</span>
            </div>
            <h4>Items:</h4>
            <ul>
              {order.items.map((item) => (
                <li key={item.itemId}>
                  {item.name} - ${item.price} x {item.quantity} = ${item.price * item.quantity}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
            <p><strong>From Address:</strong> {order.fromAddress}</p>
            <p><strong>Phone Number:</strong> {order.phoneNumber}</p>
            <p>Status: {order.status}</p>
          </div>
        </div>
      ))}
      <div>
        <button onClick={() => navigate('/add-to-cart')}>Back</button>
      </div>
    </div>
  );
};

export default ActiveOrders;