const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers/adminController');
const handleRefreshToken = require('../controllers/adminControllers/refreshTokenController');
const emergencyContactsController = require('../controllers/adminControllers/emergencyContactController');
const reviewsController = require('../controllers/adminControllers/reviewsController')
const {verifyJWT} = require('../controllers/adminControllers/verifyAdminJWT')

router.post('/login', adminController.login);
router.get('/refreshtoken', handleRefreshToken.handleRefreshToken);
router.put('/editcontact',verifyJWT,emergencyContactsController.emergencyContactsController.editContacts)
router.delete('/deletecontact/:id',verifyJWT,emergencyContactsController.emergencyContactsController.deleteContacts)
router.post('/addcontact',verifyJWT,emergencyContactsController.emergencyContactsController.addContacts)
router.get('/reviews/getreviews',verifyJWT,reviewsController.reviewsController.getReviews)
router.delete('/reviews/deletereview/:locationid/:reviewid',verifyJWT,reviewsController.reviewsController.deleteReviews)

module.exports = router;