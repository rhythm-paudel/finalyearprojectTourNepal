const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers/adminController');
const handleRefreshToken = require('../controllers/adminControllers/refreshTokenController');
const emergencyContactsController = require('../controllers/adminControllers/emergencyContactController');
const reviewsController = require('../controllers/adminControllers/reviewsController')
const userController = require('../controllers/adminControllers/userController')
const {verifyJWT} = require('../controllers/adminControllers/verifyAdminJWT')

router.post('/login', adminController.login);
router.post('/logout',adminController.logout)
router.get('/refreshtoken', handleRefreshToken.handleRefreshToken);

//contact actions
router.put('/editcontact',verifyJWT,emergencyContactsController.emergencyContactsController.editContacts)
router.delete('/deletecontact/:id',verifyJWT,emergencyContactsController.emergencyContactsController.deleteContacts)
router.post('/addcontact',verifyJWT,emergencyContactsController.emergencyContactsController.addContacts)

//reviews actions
router.get('/reviews/getreviews',verifyJWT,reviewsController.reviewsController.getReviews)
router.delete('/reviews/deletereview/:locationid/:reviewid',verifyJWT,reviewsController.reviewsController.deleteReviews)


//user actions

router.post('/users/addUser',verifyJWT,userController.userController.addUser)
router.get('/users',verifyJWT,userController.userController.getAllUser)
router.get('/users/getNotificationTokens',verifyJWT,userController.userController.getNotificationTokens)
router.get('/users/:id',verifyJWT,userController.userController.getUserById)
router.put('/users/:id',verifyJWT,userController.userController.editUser)
router.delete('/users/:id',verifyJWT,userController.userController.deleteUser)



module.exports = router;