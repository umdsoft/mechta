const router = require('express').Router()
const categoryController = require('../controllers/categoryController')


router.get('/category/:id',categoryController.getById);
router.post('/category', categoryController.addCategory);
router.get('/category', categoryController.getCategory);
router.delete('/category/:id', categoryController.deleteCategory);

router.post('/color', categoryController.addColor);
router.get('/color', categoryController.getColors);
router.delete(`/color/:id`, categoryController.deleteColor);

module.exports = router
