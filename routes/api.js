const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/admin');
const config = require ('../config/server');
const multer = require('multer');
const authController = require('../controllers/authController');
const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');

mongoose.connect(config.mongoUri,{useNewUrlParser: true, useUnifiedTopology: true}) .then(()=>{
    console.log('Bazaga Ulandi');
})
    .catch((err)=>{
        console.log('Xatolik', err);
    });

mongoose.set('useFindAndModify',false);

const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, './public/uploads');
    },
    filename: function (req,file,cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const upload = multer({storage: storage});

router.get('/', (req,res)=>{
    res.send("From API route");
});

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/color', categoryController.addColor);
router.get('/color', categoryController.getColors);
router.delete(`/color/:id`, categoryController.deleteColor);

router.post('/orders',orderController.addOrder);

router.post('/product', upload.array('images',12), productController.addProduct);
router.get('/product',productController.getProduct);
router.get('/product/:id', productController.getById);
router.delete('/product/:id',productController.deleteProduct);

router.get('/category/:id',categoryController.getById);
router.post('/category', categoryController.addCategory);
router.get('/category', categoryController.getCategory);
router.delete('/category/:id', categoryController.deleteCategory);


module.exports = router;
