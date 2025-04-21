import { Link } from 'react-router-dom';

const CustomerNavbar = () => {
  return (
    <nav>
      <Link to="/add-to-cart">Add to Cart</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/orders">Ongoing Orders</Link>
      <Link to="/history">Order History</Link>
    </nav>
  );
};

export default CustomerNavbar;