const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.getProduct = async () => {
    return Product.find();
}

exports.getById = async (id) => {
    return Product.findById(id)
}

exports.postProduct = async (product) => {
    return new Product(product).save();
}

exports.deleteProduct = async (id) => {
    return Product.findByIdAndDelete(id);
}

exports.updateProduct = async (id, product) => {
    return Product.findByIdAndUpdate(id, product);
}