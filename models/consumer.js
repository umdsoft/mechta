const mongoose = require('mongoose');
const Order = require('./order');
const Schema = mongoose.Schema;

const consumerSchema = Schema({
   phone: {
      type :String,
      required : true
   },
   region: Number,
   name: String,
   nextOrderId : Number,
   isAdmin: {type: Boolean, default: false},
   date: {type: Date, required: true},
   
   orders : [{orderId : {type : Schema.Types.ObjectId, ref: 'order'} , lastOrderId : Number}]
});

module.exports = mongoose.model('consumer', consumerSchema,'consumer');
//password: {type:String, required: true},
