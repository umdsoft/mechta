const mongoose = require('mongoose');
const Order = require('./order');
const Schema = mongoose.Schema;

const userSchema = Schema({
   email: {
      type :String,
      required : true,
      unique: true
   },
   region: Number,
   name: String,
   nextOrderId : Number,
   isAdmin: {type: Boolean, default: false},
   date: {type: Date, required: true},
   orders : [{orderId : {type : Schema.Types.ObjectID, ref: "order"} , lastOrderId : Number}]
});

module.exports = mongoose.model('user', userSchema);
//password: {type:String, required: true},
