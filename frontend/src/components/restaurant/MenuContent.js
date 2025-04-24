import React from 'react';
import Navbar from '../common/RestaurantNavbar';
import MenuItem from './MenuItem';

const MenuContent = ({ loading, error, restaurant, menu }) => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto p-4">
        {loading ? (
          <div className="text-center text-gray-600 text-lg py-10">Loading...</div>
        ) : error ? (
          <p className="text-red-500 text-lg text-center py-10">{error}</p>
        ) : (
          <>
            {/* Restaurant Header */}
            <header className="mb-8">
              {restaurant?.image ? (
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-64 object-cover rounded-xl mb-4"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 mb-4">
                  No Image
                </div>
              )}
              <h1 className="text-3xl font-semibold text-secondary mb-2">
                {restaurant?.name} Menu
              </h1>
              <p className="text-gray-700 mb-1">{restaurant?.address}</p>
              <p className="text-gray-700">
                <strong className="font-semibold text-secondary">Cuisine:</strong>{' '}
                {restaurant?.cuisineType}
              </p>
            </header>

            {/* Menu Items Section */}
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-4">Dishes</h2>
              {menu.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No menu items available.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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