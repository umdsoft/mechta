const mongoose = require('mongoose');
const Category = require('./category');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
mongoose.plugin(slug);

const productSchema = new Schema({
    pid: {type: Number, required: true},
    nameUz: {type: String, required: true},
    nameRu: {type: String, required: true},
    slug: {type: String, slug: "pid"},
    category: {
        type: Schema.Types.ObjectID,
        ref: Category,
        required: true
    },
    size: {type: String, required: true},
    netto: {type: String, required: true},
    diametr: {type: String, required: true},
    diz: {type: String, required: true},
    pok: {type: String, required: true},
    descriptionUz: {type: String,required: true},
    descriptionRu: {type: String,required: true},
    xarakterUz: {type: String, required: true},
    xarakterRu: {type: String, required: true},
    video: {type: String, required: true},
    instruksiyaUz: {type: String, required: true},
    instruksiyaRu: {type: String, required: true},
    images: [
        {
            type: String,
            required: true
        }
        ],
    price: {type: Number, required: true},
    date: Date
});

module.exports = mongoose.model('product', productSchema, 'products');
