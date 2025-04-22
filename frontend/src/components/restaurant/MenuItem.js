import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MenuItem = ({ item }) => {
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent triggering the card's onClick
    toast.success(`${item.name} added to cart!`, {
      position: 'top-right',
      autoClose: 2000,
    });
    // Navigate to the AddToCartPage with item details
    navigate('/add-to-cart', {
      state: {
        restaurantId: item.restaurantId,
        itemId: item._id,
        itemName: item.name,
        description: item.description,
        price: item.price,
      },
    });
  };

  const handleClick = () => {
    // Navigate to a menu item details page (optional)
    navigate(`/restaurants/${item.restaurantId}/menu/${item._id}`);
  };

  // Format price in LKR
  const formatPrice = (price) => {
    return `LKR ${price.toLocaleString('en-LK', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div onClick={handleClick}>
      <div>
        {item.image ? (
          <img src={item.image} alt={item.name} />
        ) : (
          <div>No Image</div>
        )}
      </div>
      <div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div>
          <p>{formatPrice(item.price)}</p>
          <button onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;