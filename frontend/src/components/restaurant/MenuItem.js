import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MenuItem = ({ item }) => {
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent triggering the card's onClick
    // Placeholder for adding to cart (you'll need to implement cart logic)
    toast.success(`${item.name} added to cart!`, {
      position: 'top-right',
      autoClose: 2000,
    });
    // Optionally navigate to cart page
    // navigate('/cart');
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
    <div
      onClick={handleClick}
      className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="w-full h-32 bg-gray-200">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-secondary">{item.name}</h3>
        <p className="text-secondary text-sm">{item.description}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="text-secondary font-semibold">
            {formatPrice(item.price)}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-primary text-white py-1 px-3 rounded hover:bg-primary-dark"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;