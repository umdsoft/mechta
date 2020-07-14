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
    const { files } = req;
    const { productId } = req.params;
    const images = req.body.images || [];

    try {
        const product = await Product.findById(productId);
        const imgs = product.images;
        if(files && images.length < 1){
            for (const [idx,file] of files.entries()) {
                const { path } = file;
                images.push({
                    url : path.replace(/\\/g, '/'),
                    colorId : req.body.colors[idx]
                });
            };
            for(const img of imgs){
                clearImage(img.path);
            }
        }
        product.nameUz = req.body.nameUz;
        product.nameRu = req.body.nameRu;
        product.pid = req.body.pid;
        product.category = req.body.category;
        product.size = req.body.size;
        product.netto = req.body.netto;
        product.diametr = req.body.diametr;
        product.diz = req.body.diz;
        product.pok = req.body.pok;
        product.descriptionUz = req.body.descriptionUz;
        product.descriptionRu = req.body.descriptionRu;
        product.xarakterUz = req.body.xarakterUz;
        product.xarakterRu = req.body.xarakterRu;
        product.video = req.body.video;
        product.instruksiyaUz = req.body.instruksiyaUz;
        product.price = req.body.price;

        const updatedProduct = await product.save();
        return res.status(200).json({
            success : true,
            product : updatedProduct
        })
    } catch (error) {
        console.log(error);
        next(error);
    }

}

const clearImage = (filePath) => {
    filePath = path.join(__dirname, "..", filePath);
    fs.unlink(filePath, (err) => {
        console.log(err);
    });
};
