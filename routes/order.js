const router = require('express').Router()
const orderController = require('../controllers/orderController')


router.post('/orders',orderController.addOrder);
router.get('/orders', orderController.getAllOrders);

module.exports = router
