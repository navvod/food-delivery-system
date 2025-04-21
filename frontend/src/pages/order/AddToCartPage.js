import AddToCartForm from '../../components/cart/AddToCartForm';
import CustomerNavbar from '../../components/common/CustomerNavbar';

const AddToCartPage = () => {
  return (
    <div className="container" style={{ backgroundColor: 'lightgray', padding: '20px' }}>
      <CustomerNavbar />
      <AddToCartForm />
    </div>
  );
};

export default AddToCartPage;