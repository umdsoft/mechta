const router = require('express').Router()
const statisticsController = require('../controllers/statisticsController');


router.get('/getstats', statisticsController.getStatistics);
// router.get('/order/:orderId',orderController.getByRegion);
router.post('/getmonthstats', statisticsController.getByMonth)

module.exports = router;