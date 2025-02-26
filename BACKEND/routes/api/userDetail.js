const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/userController');


router.route('/')
    .get(usersController.getUserDetails)


router.route('/updateUser').put(usersController.updateUser)
    
module.exports = router;
