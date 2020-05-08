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
        cb(null, './uploads');
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

router.post('/color',auth, categoryController.addColor);
router.get('/color',auth, categoryController.getColors);
router.delete(`/color/:id`,auth, categoryController.deleteColor);

router.post('/orders',auth,orderController.addOrder);

router.post('/product',auth, upload.array('images',12), productController.addProduct);

router.post('/category',auth, categoryController.addCategory);
router.get('/category',auth, categoryController.getCategory);
router.delete('/category/:id',auth, categoryController.deleteCategory);


router.get('/events', (req,res) => {
    let events = [
        {
            "_id": "1",
            "name": "Umidbek Jumaniyozov",
            "description": "lorem ispum dolor",
            "date": "2020-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Kamina",
            "description": "lorem ispum dolor",
            "date": "2020-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Salomat Dilshodova",
            "description": "lorem ispum dolor",
            "date": "2020-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Bla bla bla",
            "description": "lorem ispum dolor",
            "date": "2020-04-23T18:25:43.511Z"
        }

    ];
    res.json(events);
});

router.get('/special',auth, (req,res) => {
    let specialEvents = [
        {
            "_id": "1",
            "name": "Umidbek Jumaniyozov",
            "description": "lorem ispum dolor",
            "date": "2020-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Kamina",
            "description": "lorem ispum dolor",
            "date": "2020-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Salomat Dilshodova",
            "description": "lorem ispum dolor",
            "date": "2020-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Bla bla bla",
            "description": "lorem ispum dolor",
            "date": "2020-04-23T18:25:43.511Z"
        }

    ];
    res.json(specialEvents);
});

module.exports = router;
