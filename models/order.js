const mongoose = require('mongoose');
const Color = require('./color');
const Porduct = require('./product');
const Schema = mongoose.Schema;

const orderSchema = Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    price: {type: Number , required: true},
    num: {type: Number, required: true},
    productId: {
        type: Schema.Types.ObjectID,
        ref: Porduct,
        required: true
    },
    colorId: {
        type: Schema.Types.ObjectID,
        ref: Color,
        required: true
    },
    date: Date
});

module.exports = mongoose.model('order', orderSchema, 'orders');
