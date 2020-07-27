const express = require('express')
const router = express.Router()
const consumerController = require('../controllers/consumerController')
const {eA,eAdmin,eOperator,eBoth} = require('../middleware/checkUser');

router.post('/consumer',commentController.addComment)
router.get('/consumer',commentController.addConsumer)