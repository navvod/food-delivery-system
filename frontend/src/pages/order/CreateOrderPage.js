import CustomerNavbar from '../../components/common/CustomerNavbar';
import CreateOrder from '../../components/order/CreateOrder';

const CreateOrderPage = () => {
  return (
    <div className="container" style={{ backgroundColor: 'lightgray', padding: '20px' }}>
      <CustomerNavbar />
      <CreateOrder />
    </div>
  );
};

export default CreateOrderPage;