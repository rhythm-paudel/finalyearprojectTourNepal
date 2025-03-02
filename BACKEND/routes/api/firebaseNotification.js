const express = require('express');
const router = express.Router();
const firebaseNotificationController = require('../../controllers/firebaseNotificationController')

router.route('/').post(firebaseNotificationController.sendNotifications)

module.exports = router;