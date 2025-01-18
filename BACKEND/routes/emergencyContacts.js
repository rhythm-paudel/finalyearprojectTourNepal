const express = require('express');
const router = express.Router();
const emegencyContactsController = require('../controllers/emergencyContactsController');

router.get('/', emegencyContactsController.getAllContacts);

module.exports = router;