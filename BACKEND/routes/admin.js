const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers/adminController');
const handleRefreshToken = require('../controllers/adminControllers/refreshTokenController');

router.post('/login', adminController.login);
router.get('/refreshtoken', handleRefreshToken.handleRefreshToken);

module.exports = router;