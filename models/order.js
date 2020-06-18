const mongoose = require('mongoose');
const Color = require('./color');
const Porduct = require('./product');
const category = require('./category');
const User = require('./user');
const Schema = mongoose.Schema;

const orderSchema = Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    region : {type : Number, required : true},
    address: {type: String, required: true},
    totalPrice: {type: Number , required: true},
    totalNum: {type: Number, required: true},
    creatorId : {type : Schema.Types.ObjectId, ref : 'users'},
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'products',
                required: true
            },
            categoryId: {
                type : Schema.Types.ObjectId,
                ref : 'categories',
                required : true
            },
            color: {
                type: String,
                required: true
            },
            productNum: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
    }],
    status: {
        type: String,
        default: "noactive"
    },
    orderId: {
        type: Number,
        required: true,
        unique: true
    },
    date: Date
});

module.exports = mongoose.model('order', orderSchema, 'orders');
