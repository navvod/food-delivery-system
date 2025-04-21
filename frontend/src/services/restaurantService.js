import { api } from './api';

// Helper to get auth token (adjust based on your auth setup)
const getAuthToken = () => {
  return localStorage.getItem('token'); // Adjust based on how your auth token is stored
};

const restaurantService = {
  getRestaurants: async () => {
    console.log('Fetching restaurants from:', process.env.REACT_APP_RESTAURANT_SERVICE_URL + '/api/restaurants');
    try {
      const response = await api.restaurant.get('/api/restaurants');
      console.log('Restaurants fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching restaurants:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      throw error;
    }
  },
  getRestaurantMenu: async (restaurantId) => {
    try {
      const response = await api.restaurant.get(`/api/restaurants/${restaurantId}/menu`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching menu:', error);
      throw error;
    }
  },
  getMenuItem: async (restaurantId, itemId) => {
    try {
      const response = await api.restaurant.get(`/api/restaurants/${restaurantId}/menu/${itemId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching menu item:', error);
      throw error.response?.data || { message: 'Failed to fetch menu item' };
    }
  },

  // Admin methods
  registerRestaurant: async (data) => {
    try {
      const response = await api.restaurant.post('/api/restaurants/register', data, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to register restaurant' };
    }
  },
  updateAvailability: async (isAvailable) => {
    try {
      const response = await api.restaurant.put('/api/restaurants/availability', { isAvailable }, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update availability' };
    }
  },
  addMenuItem: async (restaurantId, data) => {
    try {
      // Remove restaurantId from the URL since the backend doesn't use it
      const response = await api.restaurant.post('/api/restaurants/menu', data, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding menu item:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      throw error.response?.data || { message: 'Failed to add menu item' };
    }
  },
  updateMenuItem: async (restaurantId, itemId, updatedItem) => {
    try {
      const response = await api.restaurant.put(`/api/restaurants/${restaurantId}/menu/${itemId}`, updatedItem, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating menu item:', {
        restaurantId,
        itemId,
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      throw error.response?.data || { message: 'Failed to update menu item' };
    }
  },
  deleteMenuItem: async (itemId) => {
    try {
      const response = await api.restaurant.delete(`/api/restaurants/menu/${itemId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete menu item' };
    }
  },
  getRestaurantDetails: async () => {
    try {
      const response = await api.restaurant.get('/api/restaurants/details', {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching restaurant details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      throw error.response?.data || { message: 'Failed to fetch restaurant details' };
    }
  },
  
};

export default restaurantService;