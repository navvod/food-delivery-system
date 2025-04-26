import React, { useState, useEffect } from 'react';
import deliveryService from '../../services/deliveryService';

const AssignedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch assigned orders on mount
  const fetchAssignedOrders = async () => {
    try {
      const data = await deliveryService.getAssignedOrders();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchAssignedOrders();
  }, []);

  const handleResponse = async (orderId, action) => {
    setError(null);
    setSuccess(null);

    try {
      const response = await deliveryService.respondToAssignment(orderId, action);
      setSuccess(response.message);
      // Refresh the orders list after responding
      fetchAssignedOrders();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleUpdateStatus = async (orderId, status) => {
    setError(null);
    setSuccess(null);

    try {
      const response = await deliveryService.updateDeliveryStatus(orderId, status);
      setSuccess(response.message);
      // Refresh the orders list after updating status
      fetchAssignedOrders();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h2>Assigned Orders</h2>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      {orders.length === 0 ? (
        <p>No pending orders assigned.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id}>
            <p>Order ID: {order.orderId}</p>
            <p>Restaurant Location: {order.restaurantLocation}</p>
            <p>Delivery Location: {order.deliveryLocation}</p>
            <p>Status: {order.status}</p>
            <p>Accept Status: {order.acceptStatus}</p>
            <div>
              {order.acceptStatus === 'Pending' && (
                <>
                  <button onClick={() => handleResponse(order.orderId, 'accept')}>
                    Accept
                  </button>
                  <button onClick={() => handleResponse(order.orderId, 'decline')}>
                    Decline
                  </button>
                </>
              )}
              {order.acceptStatus === 'Accepted' && !['Delivered', 'Cancelled'].includes(order.status) && (
                <>
                  {order.status === 'Assigned' && (
                    <button onClick={() => handleUpdateStatus(order.orderId, 'Picked Up')}>
                      Mark as Picked Up
                    </button>
                  )}
                  {order.status === 'Picked Up' && (
                    <button onClick={() => handleUpdateStatus(order.orderId, 'Delivered')}>
                      Mark as Delivered
                    </button>
                  )}
                  {order.status !== 'Delivered' && (
                    <button onClick={() => handleUpdateStatus(order.orderId, 'Cancelled')}>
                      Cancel Order
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AssignedOrders;