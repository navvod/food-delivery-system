import React from 'react';
import { ToastContainer } from 'react-toastify';
import Navbar from '../common/RestaurantNavbar';

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

  console.log('Filtered Restaurants:', filteredRestaurants);

  if (loading) {
    return <div className="text-center text-gray-600 text-lg py-10">Loading...</div>;
  }

  const defaultImage = 'https://via.placeholder.com/300x200.png?text=Restaurant+Image';

  return (
    <div className="min-h-screen bg-background font-sans">
      <ToastContainer />
      <Navbar />

      {/* Header Section */}
      <header className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <button className="text-xl">📍</button>
              <div className="flex gap-2">
                <button
                  onClick={() => setDeliveryType('Delivery')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    deliveryType === 'Delivery'
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-secondary hover:bg-primary-dark hover:text-white'
                  }`}
                >
                  Delivery
                </button>
                <button
                  onClick={() => setDeliveryType('Pickup')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    deliveryType === 'Pickup'
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-secondary hover:bg-primary-dark hover:text-white'
                  }`}
                >
                  Pickup
                </button>
              </div>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="What are you craving?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search for restaurants or dishes"
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-secondary placeholder-gray-400 transition-all duration-200"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4">
        {/* Categories Section */}
        <section className="mb-8">
          <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide snap-x snap-mandatory">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className={`flex-shrink-0 flex flex-col items-center p-3 rounded-lg min-w-[110px] transition-colors duration-200 snap-center ${
                  selectedCategory === category.name
                    ? 'bg-primary text-white'
                    : 'bg-white text-secondary hover:bg-gray-100'
                }`}
              >
                <span className="text-2xl mb-1">{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Restaurants Section */}
        <section>
          <h2 className="text-2xl font-semibold text-secondary mb-4">All Stores</h2>
          {Object.keys(groupedRestaurants).length === 0 ? (
            <p className="text-gray-500 text-center py-8">No restaurants available.</p>
          ) : (
            Object.keys(groupedRestaurants).map((category) => (
              <div key={category} className="mb-8">
                <h3 className="text-xl font-medium text-secondary mb-3">{category}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groupedRestaurants[category].map((restaurant) => (
                    <div
                      key={restaurant._id}
                      onClick={() => handleRestaurantClick(restaurant._id)}
                      className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300"
                    >
                      <div className="relative">
                        <img
                          src={restaurant.image || defaultImage}
                          alt={restaurant.name}
                          className="w-full h-48 object-cover rounded-t-xl"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(restaurant._id);
                          }}
                          className={`absolute top-3 right-3 text-2xl transition-colors duration-200 ${
                            favorites.includes(restaurant._id) ? 'text-primary' : 'text-gray-400'
                          } hover:text-primary-dark`}
                        >
                          {favorites.includes(restaurant._id) ? '♥' : '♡'}
                        </button>
                      </div>
                      <div className="p-4">
                        <h4 className="text-lg font-semibold text-secondary">{restaurant.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">{restaurant.cuisineType}</p>
                        <p className="text-sm text-gray-600 mt-1">⭐ 4.5 • 30-40 min • Free Delivery</p>
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