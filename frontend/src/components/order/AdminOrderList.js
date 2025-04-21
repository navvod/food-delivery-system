import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useOrder from '../../hooks/useOrder';
import { toast } from 'react-toastify';
import LoadingSpinner from '../common/LoadingSpinner';

const AdminOrderList = () => {
  const { orders, getAllOrders, updateOrder, loading } = useOrder();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    setIsFetching(true);
    setError(null);
    try {
      const response = await getAllOrders();
      console.log('Orders in AdminOrderList:', response);
    } catch (error) {
      console.error('Error fetching orders:', error);
      const errorMessage = error.response?.data?.error || 'Failed to fetch orders. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [getAllOrders]);

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await updateOrder(orderId, status);
      toast.success('Order status updated successfully!');
      fetchOrders();
    } catch (error) {
      console.error('Update order error:', error.response?.data || error.message);
      toast.error(error.response?.data?.error || 'Failed to update order');
    }
  };

  if (loading || isFetching) return <LoadingSpinner />;

  if (error) {
    return (
      <div>
        <div>
          <h2>All Orders</h2>
          <button onClick={fetchOrders}>Refresh</button>
        </div>
        <p>{error}</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div>
        <div>
          <h2>All Orders</h2>
          <button onClick={fetchOrders}>Refresh</button>
        </div>
        <p>No orders found. Try refreshing the list or place a test order as a customer.</p>
        <div>
          <button onClick={() => navigate('/add-to-cart')}>Place a Test Order</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>All Orders</h2>
        <button onClick={fetchOrders}>Refresh</button>
      </div>
      <div>
        {orders.map((order) => (
          <div key={order._id}>
            <div>
              <h3>Order ID: {order._id}</h3>
              <div>
                <span>Customer ID:</span>
                <span>{order.customerId}</span>
              </div>
              <div>
                <span>Restaurant ID:</span>
                <span>{order.restaurantId}</span>
              </div>
              <div>
                <span>Total Amount:</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
              <div>
                <span>Created At:</span>
                <span>{new Date(order.createdAt).toLocaleString()}</span>
              </div>
              <div>
                <span>Delivery Address:</span>
                <span>{order.deliveryAddress}</span>
              </div>
              <div>
                <span>Phone Number:</span>
                <span>{order.phoneNumber}</span>
              </div>
            </div>

            <div>
              <div>
                <span>Status:</span>
                <select
                  value={order.status}
                  onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                >
                  <option value="accepted">Accepted</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready">Ready</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                </select>
              </div>
              <h4>Items:</h4>
              <ul>
                {order.items.map((item) => (
                  <li key={item.itemId}>
                    {item.name} - ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrderList;