const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    category: String,
    stock: Number,
});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', productSchema);

class ProductManager {
    static async paginate(filter, options) {
        return Product.paginate(filter, options);
    }
}

module.exports = ProductManager;
