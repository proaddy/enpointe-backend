const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/user/login', authController.loginUser);
router.post('/banker/login', authController.loginBanker);
router.post('/user/register', authController.createUser);

module.exports = router;