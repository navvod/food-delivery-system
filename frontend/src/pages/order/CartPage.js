import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import Cart from '../../components/cart/Cart';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, fetchCart, loading } = useContext(CartContext);

  console.log('CartPage rendering, loading:', loading, 'cart:', cart);

  useEffect(() => {
    if (!cart) {
      console.log('useEffect calling fetchCart');
      fetchCart();
    }
  }, [fetchCart]);

  const handleContinueShopping = () => {
    navigate('/add-to-cart');
  };

  const handleCheckout = () => {
    navigate('/create-order');
  };

  return (
    <div className="cart-page-container">
      <h2 className="cart-title">Your Cart</h2>
      {loading ? (
        <p className="cart-loading">Loading...</p>
      ) : (
        <>
          <Cart />
          {cart && cart.items.length > 0 && (
            <div className="cart-buttons">
              <button onClick={handleContinueShopping} className="btn-continue">
                Continue Shopping
              </button>
              <button onClick={handleCheckout} className="btn-checkout">
                Proceed to Checkout
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CartPage;
