const express = require('express');
const router = express.Router();
const firebaseNotificationController = require('../../controllers/firebaseNotificationController')
const {verifyJWT} = require('../../controllers/adminControllers/verifyAdminJWT')

router.route('/').post(verifyJWT,firebaseNotificationController.sendNotifications)

module.exports = router;