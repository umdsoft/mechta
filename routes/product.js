const router = require('express').Router()
const productController = require('../controllers/productController');

const {eA,eAdmin,eOperator,eBoth} = require('../middleware/checkUser');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, './uploads/products');
    },
    filename: function (req,file,cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});


const upload = multer({storage: storage});


router.post('/product', upload.array('images',12), productController.addProduct);
router.get('/product',productController.getProduct);
router.get('/product/:id', productController.getById);
router.delete('/product/:id',productController.deleteProduct);
router.patch('/product/:productId',productController.updateProduct);
module.exports = router;
