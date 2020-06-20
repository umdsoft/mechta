const router = require('express').Router()
const categoryController = require('../controllers/categoryController');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        // console.log(file);
        cb(null, './uploads/colors');
    },
    filename: function (req,file,cb) {
        // console.log(file);
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({storage: storage});

router.get('/category/:id',categoryController.getById);
router.post('/category', categoryController.addCategory);
router.get('/category', categoryController.getCategory);
router.delete('/category/:id', categoryController.deleteCategory);

router.post('/color', upload.single('color'), categoryController.addColor);
router.get('/color', categoryController.getColors);
router.delete(`/color/:id`, categoryController.deleteColor);

module.exports = router