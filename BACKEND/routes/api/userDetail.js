const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/userController');


router.route('/')
    .get(usersController.getUserDetails)


router.route('/updateUser').put(usersController.updateUser)

router.route('/getNotifications').get(usersController.getNotifications)
    
module.exports = router;
