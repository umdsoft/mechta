const router = require('express').Router()
const orderController = require('../controllers/orderController')

const {eA,eAdmin,eOperator,eBoth} = require('../middleware/checkUser');

router.post('/check-user', orderController.checkUser);

router.post('/orders',orderController.addOrder);
router.get('/orders', orderController.getAllOrders);

router.post('/order',orderController.postOrderStatus);

module.exports = router;
