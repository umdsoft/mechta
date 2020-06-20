const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
mongoose.plugin(slug);

const categorySchema = Schema({
    nameUz: {type: String, required:true},
    nameRu: {type: String, required: true},
    cat_slug: {type: Number, required: true},
    slug: {type: String, slug: "cat_slug"},
    date: {type:Date, required: true}
});

module.exports = mongoose.model('category', categorySchema);

