// Create web server
// Load dependencies
const express = require('express');
const router = express.Router();

// Load models
const Comment = require('../models/Comment');

// Load helpers
const { userAuthenticated } = require('../helpers/authentication');

// Load controllers
const commentsController = require('../controllers/commentsController');

// Add comment
router.post('/add', userAuthenticated, commentsController.addComment);

// Edit comment
router.put('/edit/:id', userAuthenticated, commentsController.editComment);

// Delete comment
router.delete('/delete/:id', userAuthenticated, commentsController.deleteComment);

// Export router
module.exports = router;