import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Navbar from '../../components/common/Navbar';
import restaurantService from '../../services/restaurantService';

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

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [deliveryType, setDeliveryType] = useState('Delivery');
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await restaurantService.getRestaurants();
        console.log('Fetched Restaurants:', response);
        setRestaurants(response || []);
        setFilteredRestaurants(response || []);
      } catch (err) {
        toast.error(err.message || 'Failed to fetch restaurants', {
          position: 'top-right',
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  useEffect(() => {
    let filtered = restaurants;

    if (searchQuery) {
      filtered = filtered.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      console.log('Search Query:', searchQuery, 'Filtered:', filtered);
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.cuisineType === selectedCategory ||
          (restaurant.menu && restaurant.menu.some((item) => item.category === selectedCategory))
      );
    }

    setFilteredRestaurants(filtered);
  }, [searchQuery, selectedCategory, restaurants]);

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

  const toggleFavorite = (restaurantId) => {
    setFavorites((prev) =>
      prev.includes(restaurantId)
        ? prev.filter((id) => id !== restaurantId)
        : [...prev, restaurantId]
    );
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

export default RestaurantsPage;