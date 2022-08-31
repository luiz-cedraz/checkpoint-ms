const mongoose = require('mongoose');
const Category = mongoose.model('Category');

exports.getCategory = async () => {
    return Category.find();
}

exports.getCategoryById = async (id) => {
    return Category.findById(id)
}

exports.postCategory = async (category) => {
    return new Category(category).save();
}

exports.deleteCategory = async (id) => {
    return Category.findByIdAndDelete(id);
}

exports.updateCategory = async (id, category) => {
    return Category.findByIdAndUpdate(id, category);
}