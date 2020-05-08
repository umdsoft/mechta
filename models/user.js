const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema({
   email: {type:String, required: true},
   password: {type:String, required: true},
   name: {type:String, required: true},
   isAdmin: {type: Boolean, required: true},
   date: {type: Date, required: true}
});

module.exports = mongoose.model('user', userSchema, 'users');
