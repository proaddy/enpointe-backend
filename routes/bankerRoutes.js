const express = require('express');
const router = express.Router();
const bankerController = require('../controllers/bankerController');
const { authenticateToken, isBanker } = require('../middleware/authMiddleware');

// Apply authentication to all banker routes
router.use(authenticateToken);
router.use(isBanker);

router.get('/users', bankerController.getAllUsers);
router.get('/users/:userId/transactions', bankerController.getUserTransactions);

module.exports = router;