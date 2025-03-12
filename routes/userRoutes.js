const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, isUser } = require('../middleware/authMiddleware');

// Apply authentication to all user routes
router.use(authenticateToken);
router.use(isUser);

router.get('/transactions', userController.getUserTransactions);
router.get('/balance', userController.getUserBalance);
router.post('/deposit', userController.deposit);
router.post('/withdraw', userController.withdraw);

module.exports = router;