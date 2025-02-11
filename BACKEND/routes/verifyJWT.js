const express = require('express');
const router = express.Router();

const verifyJWTController = require('../controllers/verifyJWTController')

router.post('/',verifyJWTController.verifyJWT)

module.exports = router