const Category = require('../models/category');
const Color = require('../models/color');

exports.addCategory = (req,res) => {
    if(!req.body.name){
        res.json("name required");
    }
    const category = new Category({
        name: req.body.name,
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
    if(!req.body.name){
        res.json("name required");
    }
    const color = new Color({
        name: req.body.name,
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
            console.log("Error" + err);
        }
    });
}
