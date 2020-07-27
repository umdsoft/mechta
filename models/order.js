const mongoose = require('mongoose');
const Color = require('./color');
const Porduct = require('./product');
const category = require('./category');
const Consumer = require('./consumer');
const Schema = mongoose.Schema;

const orderSchema = Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    region : {type : Number, required : true},
    address: {type: String, required: true},
    totalPrice: {type: Number , required: true},
    totalNum: {type: Number, required: true},
    products: [
        { 
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'products',
                required: true
            },
            color: {
                type: Schema.Types.ObjectId,
                ref : "color",
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
    date: Date
});

module.exports = mongoose.model('order', orderSchema,'orders');
