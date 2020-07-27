const Category = require('../models/category');
const Color = require('../models/color');
const Product = require('../models/product')

exports.addCategory = (req,res) => {
    if(!req.body.nameUz){
        res.json("name required");
    }
    const category = new Category({
        nameUz: req.body.nameUz,
        nameRu: req.body.nameRu,
        cat_slug: Date.now(),
        date: Date.now()
    });

    category.save()
        .then(result => {
            res.status(200).json({
                message: "Ушпешно добавления"
            })
        });
}

exports.getCategory = async (req,res)=>{
    let category =await Category.find().sort({date: -1});
    res.send(category);
}

exports.updateCategory = async(req, res) => {
    const { categoryId } = req.params;

    try {
        const category = await Category.findById(categoryId);
        
        category.nameUz = req.body.nameUz;
        category.nameRu = req.body.nameRu;

        const updatedCategory = await category.save();
        return res.status(200).json({
            success : true,
            category : updatedCategory
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.deleteCategory = (req,res) => {
    Category.findByIdAndDelete(req.params.id , (err,doc)=>{
        if(!err){
            res.json({message: "Этот категория был удален"});
        } else {
            console.log("Error" + err);
        }
    });


}

exports.addColor = (req,res) => {
    const color = new Color({
        name: req.body.name,
        url : req.body.url,
        date: Date.now()
    });
    color.save().then(result => {
        res.status(200).json({
            message: "Ушпешно добавления"
        })
    });
}
exports.getColors = async (req,res) => {
    let colors = await Color.find().sort({date: -1});
    res.send(colors);
}
exports.deleteColor = (req,res) => {
    Color.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.json({message: "Этот цвет был удален"});
        } else {
        res.json({error : err});
            res.json({ error : err })
            console.log("Error" + err);
        }
    });
}

exports.getById = async (req,res)=>{
    const getProducts = await Product
        .find({category: req.params.id})
        .sort({date: -1});
    res.send(getProducts);
}
