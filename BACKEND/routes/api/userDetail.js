const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/userController');


router.route('/')
    .get(usersController.getUserDetails)
    .post(usersController.updateUser)

router.route('/updateUser').put(usersController.updateUser)
    
module.exports = router;
