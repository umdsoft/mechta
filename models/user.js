const mongoose = require('mongoose');
const Order = require('./order');
const Schema = mongoose.Schema;

const userSchema = Schema({
   phone: {
      type :String,
      required : true
   },
   region: Number,
   name: String,
   nextOrderId : Number,
   isAdmin: {type: Boolean, default: false},
   date: {type: Date, required: true},
   orders : [{orderId : {type : Schema.Types.ObjectID, ref: "orders"} , lastOrderId : Number}]
});

module.exports = mongoose.model('user', userSchema, 'users');
//password: {type:String, required: true},