const express = require('express');
const router = express.Router();
const path = require('path');
const refreshTokenController = require('../controllers/refreshTokenController');


//for getting a new access token in case of expiration of accesstoken via refreshtoken
router.post('/', refreshTokenController.handleRefreshToken);

module.exports = router;