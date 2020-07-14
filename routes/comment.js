const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentCotroller')

router.post('/comment',commentController.addComment)
router.get('/comment',commentController.getAllComments)

module.exports = router
