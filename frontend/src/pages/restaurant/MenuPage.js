import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import MenuItem from '../../components/restaurant/MenuItem';
import restaurantService from '../../services/restaurantService';
import { toast } from 'react-toastify';

const MenuPage = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await restaurantService.getRestaurantMenu(restaurantId);
        setRestaurant(data.restaurant);
        setMenu(data.menu || []);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch menu');
        toast.error(err.message || 'Failed to load restaurant menu', {
          position: 'top-right',
          autoClose: 3000,
        });
        setLoading(false);
      }
    };
    fetchMenu();
  }, [restaurantId]);

  return (
    <div>
      <Navbar />
      <main>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <header>
              {restaurant?.image ? (
                <img src={restaurant.image} alt={restaurant.name} />
              ) : (
                <div>No Image</div>
              )}
              <h1>{restaurant?.name} Menu</h1>
              <p>{restaurant?.address}</p>
              <p>Cuisine: {restaurant?.cuisineType}</p>
            </header>

            <section>
              <h2>Dishes</h2>
              {menu.length === 0 ? (
                <p>No menu items available.</p>
              ) : (
                <div>
                  {menu.map((item) => (
                    <MenuItem key={item._id} item={item} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default MenuPage;