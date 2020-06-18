const router = require('express').Router()
const orderController = require('../controllers/orderController')


router.post('/orders',orderController.addOrder);
router.get('/orders', orderController.getAllOrders);

router.get('/order/:orderId',orderController.getOrderStatus);

module.exports = router;
