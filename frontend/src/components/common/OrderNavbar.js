import { Link } from 'react-router-dom';

const CustomerNavbar = () => {
  return (
    <nav>
      <Link to="/active-orders">Ongoing Orders</Link>
      <Link to="/history">Order History</Link>
    </nav>
  );
};

export default CustomerNavbar;