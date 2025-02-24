const express = require('express');
const router = express.Router();
const nearbyPlacesController = require('../../controllers/nearbyPlacesController.js');


router.route('/')
    .get(nearbyPlacesController.getReviews)


module.exports = router;