const Product = require('../models/product');

exports.addProduct = async (req, res) => {
    const urls = [];
    const files = req.files;

    for (const [idx,file] of files.entries()) {
        const { path } = file;
        urls.push({
            url : path.replace(/\\/g, '/'),
            colorId : req.body.colors[idx]
        });
    };
    const product = new Product({
        nameUz: req.body.nameUz,
        nameRu: req.body.nameRu,
        category: req.body.category,
        size: req.body.size,
        diametr: req.body.diametr,
        descriptionUz: req.body.descriptionUz,
        descriptionRu: req.body.descriptionRu,
        xarakterUz: req.body.xarakterUz,
        xarakterRu: req.body.xarakterRu,
        images: urls,
        price: req.body.price,
        pid: Date.now(),
        date: Date.now()
    });

    product.save(/*{validateBeforeSave:false}*/)
        .then(result => {
            res.status(200).json({
                message: "Ушпешно добавления"
            })
        });
}
exports.getProduct = async (req, res)=> {
    const product = await Product.find().populate('images.colorId').sort({date: -1});
    res.status(200).json(product);
}
exports.getById = async (req, res) => {
    const getProduct = await Product.findById({_id:req.params.id});
    const categoryId = getProduct.category;
    const similarProducts = await Product
        .find({category  : categoryId});
    res.send({getProduct :getProduct  , similarProducts : similarProducts});
}
exports.deleteProduct = (req,res) => {
    Product.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.json({message: "Этот был удален"});
        } else {
            console.log("Error" + err);
        }
    });
}

exports.updateProduct = async(req, res) => {

        const product = await Product.findByIdAndUpdate(req.params.id)
            product.price = req.body.price
                product.save({validateBeforeSave:false})
                    .then(()=>{
                        res.status(200).json({
                            success : true,
                            product : product
                        })
                    })
                    .catch((err)=>{
                        res.status(500).json({
                            success : false,
                            err
                        })
                    })
}

const clearImage = (filePath) => {
    filePath = path.join(__dirname, "..", filePath);
    fs.unlink(filePath, (err) => {
        console.log(err);
    });
};



