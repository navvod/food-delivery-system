import React from 'react';
import { ToastContainer } from 'react-toastify';
import Navbar from '../common/Navbar';

const categories = [
  { name: 'Vegan', icon: '🥦' },
  { name: 'Fusion', icon: '🍱' },
  { name: 'Fast Food', icon: '🍔' },
  { name: 'Healthy', icon: '🥗' },
  { name: 'Chinese', icon: '🥡' },
  { name: 'Japanese', icon: '🍣' },
  { name: 'Thai', icon: '🍜' },
  { name: 'Korean', icon: '🍲' },
  { name: 'Indian', icon: '🍛' },
  { name: 'Sri Lankan', icon: '🍚' },
  { name: 'Desserts & Bakery', icon: '🍰' },
  { name: 'Italian', icon: '🍝' },
  { name: 'Street Food', icon: '🌮' },
];

const RestaurantsContent = ({
  loading,
  restaurants,
  filteredRestaurants,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  deliveryType,
  setDeliveryType,
  favorites,
  toggleFavorite,
  navigate,
}) => {
  const groupedRestaurants = filteredRestaurants.reduce((acc, restaurant) => {
    const category = restaurant.cuisineType || 'Other';
    acc[category] = acc[category] || [];
    acc[category].push(restaurant);
    return acc;
  }, {});

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/restaurants/${restaurantId}/menu`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ToastContainer />
      <Navbar />

      <header>
        <div>
          <div>
            <button>📍</button>
            <div>
              <button onClick={() => setDeliveryType('Delivery')}>
                Delivery
              </button>
              <button onClick={() => setDeliveryType('Pickup')}>
                Pickup
              </button>
            </div>
          </div>
          <div>
            <input
              type="text"
              placeholder="What are you craving?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search for restaurants or dishes"
            />
          </div>
        </div>
      </header>

      <main>
        <section>
          <div>
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2>All Stores</h2>
          {Object.keys(groupedRestaurants).length === 0 ? (
            <p>No restaurants available.</p>
          ) : (
            Object.keys(groupedRestaurants).map((category) => (
              <div key={category}>
                <h3>{category}</h3>
                <div>
                  {groupedRestaurants[category].map((restaurant) => (
                    <div
                      key={restaurant._id}
                      onClick={() => handleRestaurantClick(restaurant._id)}
                    >
                      <div>
                        {restaurant.image ? (
                          <img src={restaurant.image} alt={restaurant.name} />
                        ) : (
                          <div>No Image</div>
                        )}
                      </div>
                      <div>
                        <div>
                          <h4>{restaurant.name}</h4>
                          <p>{restaurant.cuisineType}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(restaurant._id);
                          }}
                        >
                          {favorites.includes(restaurant._id) ? '♥' : '♡'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default RestaurantsContent;