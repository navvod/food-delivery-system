import CustomerNavbar from '../../components/common/CustomerNavbar';
import OrderHistory from '../../components/order/OrderHistory';

const OrderHistoryPage = () => {
  return (
    <div className="container" style={{ backgroundColor: 'lightgray', padding: '20px' }}>
      <CustomerNavbar />
      <OrderHistory />
    </div>
  );
};

export default OrderHistoryPage;