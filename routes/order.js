const router = require('express').Router()
const orderController = require('../controllers/orderController')

const {eA,eAdmin,eOperator,eBoth} = require('../middleware/checkUser');

router.post('/orders',orderController.addOrder);
router.get('/orders', orderController.getAllOrders);
router.put('/order/:id',orderController.updateOrder);
module.exports = router;
