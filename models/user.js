const mongoose = require('mongoose');
const Order = require('./order');
const Schema = mongoose.Schema;

const userSchema = Schema({
   email: {type:String, required: true},
   password: {type:String, required: true},
   name: {type:String, required: true},
   isAdmin: {type: Boolean, required: true},
   date: {type: Date, required: true},
   orders : [{orderId : {type : Schema.Types.ObjectID, ref: "orders"}}]
});

module.exports = mongoose.model('user', userSchema, 'users');
