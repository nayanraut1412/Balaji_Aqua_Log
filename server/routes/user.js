const express = require('express');
const router = express.Router();
// const { verifyToken } = require('../middleware/authMiddleware');
const { createUser, loginUser } = require('../controllers/userController');

// Route to create a user (no authentication required)
router.post('/', createUser);

router.post('/login', loginUser);


// Export router
module.exports = router;
