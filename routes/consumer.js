const express = require('express')
const router = express.Router()
const consumerController = require('../controllers/consumerController')

router.post('/consumer',commentController.addComment)
router.get('/consumer',commentController.addConsumer)