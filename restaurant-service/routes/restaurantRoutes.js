const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  registerRestaurant,
  updateAvailability,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getRestaurantDetails,
  getRestaurants,
  getRestaurantMenu,
  getMenuItem,
  
} = require('../controller/restaurantController');

// Public routes (no authentication required)
router.get('/', getRestaurants); // Get all restaurants
router.get('/:restaurantId/menu', getRestaurantMenu); // Get a restaurant's menu

// Admin routes (require authentication and role)
// Restaurant Admin routes
router.post('/register', protect, authorize('restaurant_admin'), registerRestaurant);
router.put('/availability', protect, authorize('restaurant_admin'), updateAvailability);
router.post('/menu', protect, authorize('restaurant_admin'), addMenuItem);
router.put('/:restaurantId/menu/:itemId', protect, authorize('restaurant_admin'), updateMenuItem);
router.delete('/menu/:itemId', protect, authorize('restaurant_admin'), deleteMenuItem);
router.get('/details', protect, authorize('restaurant_admin'), getRestaurantDetails);
router.get('/:restaurantId/menu/:itemId', protect, authorize('restaurant_admin'), getMenuItem);


module.exports = router;