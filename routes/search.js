const router = require('express').Router()
const searchController = require('../controllers/searchController');

const {eA,eAdmin,eOperator,eBoth} = require('../middleware/checkUser');
router.post('/search',searchController.getProductByName);

module.exports = router;
