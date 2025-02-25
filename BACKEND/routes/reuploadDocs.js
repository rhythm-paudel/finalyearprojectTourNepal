const express = require('express');
const router = express.Router();
const reuploadDocsController = require('../controllers/reuploadDocsController');

router.put('/', reuploadDocsController.handleReuploadDocs);

module.exports = router;