import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useOrder from '../../hooks/useOrder';
import LoadingSpinner from '../common/LoadingSpinner';

const OrderList = () => {
  const { activeOrders, getActiveOrders, loading } = useOrder();

  useEffect(() => {
    getActiveOrders();
  }, [getActiveOrders]);

  if (loading) return <LoadingSpinner />;

  if (!activeOrders || activeOrders.length === 0) {
    return (
      <div>
        <h2>Active Orders</h2>
        <p>No active orders found.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Active Orders</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Restaurant ID</th>
              <th>Status</th>
              <th>Total Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {activeOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.restaurantId}</td>
                <td>{order.status}</td>
                <td>${order.totalAmount.toFixed(2)}</td>
                <td>
                  <Link to={`/order/${order._id}`}>
                    <button>View Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;