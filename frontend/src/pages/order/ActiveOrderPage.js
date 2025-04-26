import OrderNavbar from '../../components/common/OrderNavbar';
import ActiveOrders from '../../components/order/ActiveOrders';

const ActiveOrderPage = () => {
  return (
    <div className="container" style={{ backgroundColor: 'lightgray', padding: '20px' }}>
      <OrderNavbar />
      <ActiveOrders/>
    </div>
  );
};

export default ActiveOrderPage;