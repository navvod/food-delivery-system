import React from 'react';
import Navbar from '../common/Navbar';

const RestaurantDashboardContent = ({
  loading,
  error,
  restaurant,
  menu,
  handleUpdateAvailability,
  handleDeleteMenuItem,
  navigate,
  restaurantId,
}) => {
  const formatPrice = (price) => {
    return `LKR ${price.toLocaleString('en-LK', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <p>{error}</p>
        {error.includes('No restaurant found') && (
          <div>
            <button onClick={() => navigate('/admin/register-restaurant')}>
              Register a Restaurant
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main>
        <h2>{restaurant.name} Dashboard</h2>

        <section>
          <h3>Restaurant Details</h3>
          <p><strong>Name:</strong> {restaurant.name}</p>
          <p><strong>Address:</strong> {restaurant.address}</p>
          <p><strong>Contact:</strong> {restaurant.contact}</p>
          <p><strong>Cuisine Type:</strong> {restaurant.cuisineType}</p>
          <div>
            <p><strong>Availability:</strong> {restaurant.isAvailable ? 'Available' : 'Unavailable'}</p>
            <button onClick={() => handleUpdateAvailability(!restaurant.isAvailable)}>
              {restaurant.isAvailable ? 'Set Unavailable' : 'Set Available'}
            </button>
          </div>
        </section>

        <section>
          <h3>Menu Items</h3>
          <button onClick={() => navigate(`/restaurant/${restaurantId}/add-menu`)}>
            Add Menu Item
          </button>
          {menu.length === 0 ? (
            <p>No menu items available.</p>
          ) : (
            <ul>
              {menu.map(item => (
                <li key={item._id || item.id || Math.random()}>
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <p>Price: {formatPrice(item.price)}</p>
                    <p>Category: {item.category}</p>
                  </div>
                  <div>
                    <button onClick={() => {
                      const itemId = item._id || item.id;
                      if (!itemId) {
                        console.error('Item ID is undefined for item:', item);
                        return;
                      }
                      console.log('Navigating to edit menu item with ID:', itemId);
                      navigate(`/restaurant/${restaurantId}/edit-menu/${itemId}`);
                    }}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteMenuItem(item._id || item.id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default RestaurantDashboardContent;