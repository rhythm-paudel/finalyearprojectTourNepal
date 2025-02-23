const express = require('express');
const router = express.Router();
const nearbyPlacesController = require('../../controllers/nearbyPlacesController.js');
const {verifyRefreshToken} = require('../../middleware/verifyUser.js');


router.route('/')
    .post(nearbyPlacesController.getNearbyPlaces)


// router.route('/getNearbyPlaces')
//     .get(nearbyPlacesController.getNearbyPlaces)
//     // .post(verifyRefreshToken,nearbyPlacesController.postReviews)


module.exports = router;
