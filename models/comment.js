const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    comment: {type: String, require: true},
    status: {type: Boolean, default: false},
    product :{type : Schema.Types.ObjectId, ref: 'product'},
    date: {type: Date, default: Date.now()}
})
module.exports = mongoose.model('comments', commentSchema, 'comments')
