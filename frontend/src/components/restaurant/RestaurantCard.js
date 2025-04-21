import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div>
      <h3>{restaurant.name}</h3>
      <p>Cuisine: {restaurant.cuisineType}</p>
      <p>Address: {restaurant.address}</p>
      {restaurant.image && <img src={restaurant.image} alt={restaurant.name} />}
      <Link to={`/restaurants/${restaurant._id}/menu`}>
        <button>View Menu</button>
      </Link>
    </div>
  );
};

export default RestaurantCard;