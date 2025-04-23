const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  assignDriver,
  respondToAssignment,
  getAssignedOrders,
} = require('../controllers/deliveryOrderController');

router.post('/assign', protect, authorize('restaurant_admin'), assignDriver);
router.post('/respond', protect, authorize('delivery_personnel'), respondToAssignment);
router.get('/assigned-orders', protect, authorize('delivery_personnel'), getAssignedOrders);

module.exports = router;