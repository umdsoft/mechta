const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentCotroller')

const {eA,eAdmin,eOperator,eBoth} = require('../middleware/checkUser');

router.post('/comment',commentController.addComment)
router.get('/comments',commentController.getAllNoActiveComments)
router.get('/all-comments',commentController.getAllComments)
router.get('/comment',commentController.getCommentByProduct)
router.patch('/comment',commentController.updateCommentById)
module.exports = router
