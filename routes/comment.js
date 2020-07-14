const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentCotroller')

router.post('/comment',commentController.addComment)
router.get('/comments',commentController.getAllComments)
router.get('/comment',commentController.getCommentByProduct)
router.patch('/comment',commentController.updateCommentById)
module.exports = router
