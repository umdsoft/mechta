const Product = require('../models/product');

exports.addProduct = async (req, res) => {
    const urls = []
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
        pid: Date.now(),
        category: req.body.category,
        size: req.body.size,
        netto: req.body.netto,
        diametr: req.body.diametr,
        diz: req.body.diz,
        pok: req.body.pok,
        descriptionUz: req.body.descriptionUz,
        descriptionRu: req.body.descriptionRu,
        xarakterUz: req.body.xarakterUz,
        xarakterRu: req.body.xarakterRu,
        video: req.body.video,
        instruksiyaUz: req.body.instruksiyaUz,
        instruksiyaRu: req.body.instruksiyaRu,
        images: urls,
        price: req.body.price,
        date: Date.now()
    });

    product.save()
        .then(result => {
            res.status(200).json({
                message: "Ушпешно добавления"
            })
        });
}

exports.getProduct = async (req, res)=> {
    const product = await Product.find().sort({date: -1});
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
