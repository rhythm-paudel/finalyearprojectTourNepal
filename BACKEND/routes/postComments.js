const express = require('express');
const router = express.Router();
const postCommentsController = require('../controllers/postCommentsController');

router.post('/', postCommentsController.postCommentsController.postComments);
router.put('/update', postCommentsController.postCommentsController.updateComments);
router.delete('/delete', postCommentsController.postCommentsController.deleteComments);
module.exports = router;
