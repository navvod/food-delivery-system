import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useOrder from '../../hooks/useOrder';
import LoadingSpinner from '../common/LoadingSpinner';

const OrderDetails = () => {
  const { orderId } = useParams();
  const { getOrder, loading } = useOrder();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      const fetchedOrder = await getOrder(orderId);
      console.log('Fetched order:', fetchedOrder);
      setOrder(fetchedOrder);
    };
    fetchOrder();
  }, [orderId, getOrder]);

  if (loading || !order) return <LoadingSpinner />;

  return (
    <div className="order-details-container">
      <h2 className="order-details-title">Order Details</h2>

      <div className="order-summary">
        <div className="order-row">
          <span className="label">Order ID:</span>
          <span>{order._id}</span>
        </div>
        <div className="order-row">
          <span className="label">Restaurant ID:</span>
          <span>{order.restaurantId}</span>
        </div>
        <div className="order-row">
          <span className="label">Total Amount:</span>
          <span>${order.totalAmount.toFixed(2)}</span>
        </div>
        <div className="order-row">
          <span className="label">Status:</span>
          <span>{order.status}</span>
        </div>
      </div>

      <h3>Items</h3>
      <div className="order-items">
        <table className="items-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.itemId}>
                <td>{item.name || 'N/A'}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>${(item.amount || item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="back-button-container">
        <button onClick={() => navigate('/orders')} className="back-button">
          Back to Order List
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
