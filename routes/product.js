const router = require('express').Router()
const productController = require('../controllers/productController')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, './uploads');
    },
    filename: function (req,file,cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const upload = multer({storage: storage});


router.post('/product', upload.array('images',12), productController.addProduct);
router.get('/product',productController.getProduct);
router.get('/product/:id', productController.getById);
router.delete('/product/:id',productController.deleteProduct);

module.exports = router;
