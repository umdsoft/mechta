const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const colorSchema = Schema({
    name : String,
    date: {type: Date, required: true}
});

module.exports = mongoose.model('color', colorSchema);

