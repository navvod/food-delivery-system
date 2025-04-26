import CustomerNavbar from '../../components/common/OrderNavbar';
import OrderDetails from '../../components/order/OrderDetails';

const OrderDetailsPage = () => {
  return (
    <div className="container" style={{ backgroundColor: 'lightgray', padding: '20px' }}>
      <CustomerNavbar />
      <OrderDetails />
    </div>
  );
};

export default OrderDetailsPage;