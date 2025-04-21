// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//akila
import LoginPage from './pages/user/LoginPage';
import RegisterPage from './pages/user/RegisterPage';
import ProfilePage from './pages/user/ProfilePage';

//naduni
import Home from './pages/restaurant/Home';
import RestaurantsPage from './pages/restaurant/RestaurantsPage';
import MenuPage from './pages/restaurant/MenuPage';
import RestaurantDashboard from './pages/restaurant/RestaurantDashboard';
import RegisterRestaurantPage from './pages/restaurant/RegisterRestaurantPage';
import AddMenuItemPage from './pages/restaurant/AddMenuItemPage';
import EditMenuItemPage from './pages/restaurant/EditMenuItemPage';
import AdminDashboard from './pages/restaurant/AdminDashboard';

//lakna
import AddToCartPage from './pages/order/AddToCartPage';
import CartPage from './pages/order/CartPage';
import EditCartPage from './pages/order/EditCartPage';
import CreateOrderPage from './pages/order/CreateOrderPage';
import OrderListPage from './pages/order/OrderListPage';
import OrderDetailsPage from './pages/order/OrderDetailsPage';
import OrderHistoryPage from './pages/order/OrderHistoryPage';
import AdminDashboardPage2 from './pages/order/AdminDashboardPage2';
import ActiveOrders from './components/order/ActiveOrders';


function App() {
  return (
    <AuthProvider>
      <CartProvider>
       <OrderProvider>
         <Router>
           <Routes>
              {/* akila */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />

              {/* naduni */}
              <Route path="/" element={<Home />} />
              <Route path="/restaurants" element={<RestaurantsPage />} />
              <Route path="/restaurants/:restaurantId/menu" element={<MenuPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/register-restaurant" element={<RegisterRestaurantPage />} />
              <Route path="/restaurant/:restaurantId/dashboard" element={<RestaurantDashboard />} />
              <Route path="/restaurant/:restaurantId/add-menu" element={<AddMenuItemPage />} />
              <Route path="/restaurant/:restaurantId/edit-menu/:itemId" element={<EditMenuItemPage />} />

              {/* lakna */}
              {/* Customer Routes */}
              <Route path="/add-to-cart" element={<AddToCartPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/cart/edit/:itemId" element={<EditCartPage />} />
              <Route path="/create-order" element={<CreateOrderPage />} />
              <Route path="/orders" element={<OrderListPage />} />
              <Route path="/order/:orderId" element={<OrderDetailsPage />} />
              <Route path="/history" element={<OrderHistoryPage />} />
              <Route path="/orders/active" element={<ActiveOrders />} />
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboardPage2 />} />
           </Routes>
         </Router>
         <ToastContainer />
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;