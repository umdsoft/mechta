const Product = require('../models/product');

exports.addProduct = async (req,res) => {

    const urls = []
    const files = req.files;
    for (const file of files) {
        const { path } = file;
        urls.push(path) ;
    }

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
