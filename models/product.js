const mongoose = require('mongoose');

const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
mongoose.plugin(slug);

const productSchema = new Schema({
    pid: {type: Number, required: true},
    nameUz: {type: String, required: true},
    nameRu: {type: String, required: true},
    slug: {type: String, slug: "pid"},
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    size: {type: String, required: true},
    diametr: {type: String, required: true},
    descriptionUz: {type: String,required: true},
    descriptionRu: {type: String,required: true},
    xarakterUz: {type: String, required: true},
    xarakterRu: {type: String, required: true},
    images: [
        {
            url : {
                type: String,
                required: true
            },
            colorId : {
                type : Schema.Types.ObjectId,
                ref : 'color'
            }
        }
        ],
    price: {type: Number, required: true},
    date: Date
});

module.exports = mongoose.model('product', productSchema, 'products');
