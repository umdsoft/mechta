const Comment = require('../models/comment')

exports.addComment = (req,res) => {
    const comment = new Comment({
        name: req.body.name,
        phone: req.body.phone,
        comment: req.body.comment,
        product: req.body.product
    })
    comment.save()
        .then( () => res.status(200).json({message: 200}))
        .catch((e) => console.log(e))
}
exports.getAllComments = async (req,res) => {
    const comments = await Comment
        .find({status: false})
        .populate('product')
        .sort({date: -1})
    res.send(comments)
}
exports.getCommentByProduct = async (req,res) => {
    const comments = await Comment
        .find({product: req.headers.id, status: false})
        .populate('product')
        .sort({date: -1})

    res.send(comments)
}
