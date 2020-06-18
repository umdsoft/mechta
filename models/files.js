const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fileSchema = Schema({
    path: {type:String, required: true},
    date: {type: Date, required: true}
});

module.exports = mongoose.model('file', fileSchema, 'files');
