import React from 'react';
import Navbar from '../common/Navbar';
import MenuItem from './MenuItem';

const MenuContent = ({ loading, error, restaurant, menu }) => {
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

export default MenuContent;