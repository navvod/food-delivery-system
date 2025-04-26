import CustomerNavbar from '../../components/common/OrderNavbar';
import OrderList from '../../components/order/OrderList';

const OrderListPage = () => {
  return (
    <div className="container" style={{ backgroundColor: 'lightgray', padding: '20px' }}>
      <CustomerNavbar />
      <OrderList />
    </div>
  );
};

export default OrderListPage;