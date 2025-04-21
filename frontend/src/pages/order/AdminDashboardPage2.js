import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AdminNavbar from '../../components/common/AdminNavbar';
import AdminOrderList from '../../components/order/AdminOrderList';
import { AuthContext } from '../../context/AuthContext';

const AdminDashboardPage = () => {
  const { user } = useContext(AuthContext);

  if (user?.role !== 'restaurant_admin') {
    return <Navigate to="/add-to-cart" />;
  }

  return (
    <div className="container" style={{ backgroundColor: 'lightgray', padding: '20px' }}>
      <AdminNavbar />
      <AdminOrderList />
    </div>
  );
};

export default AdminDashboardPage;