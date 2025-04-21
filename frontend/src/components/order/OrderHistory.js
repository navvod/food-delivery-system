import { useContext, useEffect } from 'react';
import { OrderContext } from '../../context/OrderContext';
import { toast } from 'react-toastify';

const OrderHistory = () => {
  const { orderHistory, getOrderHistory, loading } = useContext(OrderContext);

  useEffect(() => {
    console.log('OrderHistory useEffect triggered');
    const fetchOrderHistory = async () => {
      try {
        console.log('Calling getOrderHistory...');
        await getOrderHistory();
        console.log('getOrderHistory completed');
      } catch (error) {
        console.error('Error fetching order history:', error.message);
        toast.error('Failed to fetch order history');
      }
    };
    fetchOrderHistory();
  }, [getOrderHistory]);

  console.log('OrderHistory rendering, loading:', loading, 'orderHistory:', orderHistory);

  if (loading) {
    return <div className="order-history-loading">Loading order history...</div>;
  }

  if (!orderHistory || orderHistory.length === 0) {
    return <div className="order-history-empty">No orders found in history.</div>;
  }

  return (
    <div className="order-history-container">
      <h2 className="order-history-title">Order History</h2>
      {orderHistory.map((order) => (
        <div 
          key={order._id} 
          className={`order-card ${order.status.toLowerCase() === 'cancel' ? 'cancelled' : ''}`}
        >
          <div className="order-details">
            <p className="order-created"><strong>Create Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <h3 className="order-id">Order ID: {order._id}</h3>
            <div className="order-status">
              <span className="label">Status:</span>
              <span>{order.status}</span>
            </div>

            <h4 className="order-items-title">Items:</h4>
            <ul className="order-items-list">
              {order.items.map((item) => (
                <li key={item.itemId} className="order-item">
                  {item.name} - ${item.price} x {item.quantity} = ${item.price * item.quantity}
                </li>
              ))}
            </ul>

            <div className="order-total">
              <span className="label">Total Amount:</span>
              <span>${order.totalAmount}</span>
            </div>
          </div>

          <div className="order-address">
            <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
            <p><strong>From Address:</strong> {order.fromAddress}</p>
            <p><strong>Phone Number:</strong> {order.phoneNumber}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
