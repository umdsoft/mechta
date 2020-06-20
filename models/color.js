const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const colorSchema = Schema({
    url: {type: String, required: true},
    name : String,
    date: {type: Date, required: true}
});

module.exports = mongoose.model('color', colorSchema, 'colors');

