const express = require('express');
const router = express.Router();
// const { verifyToken } = require('../middleware/authMiddleware');
const { createOrder, getOrders } = require('../controllers/orderController');

// Route to create a user (no authentication required)

router.post('/', createOrder); // create a order

router.get('/', getOrders);  // Fetch all orders

// Export router
module.exports = router;
