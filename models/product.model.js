const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    categoryName: { type: String, default: 'Общая категория' },
    descriptionMain: { type: String, required: true },
    descriptionModal: { type: String, required: true },
    price: { type: String, required: true },
    isVisible: { type: Boolean, default: true },
    freeDate: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    isCommission: { type: Boolean, default: false },
});

module.exports = mongoose.model('Product', ProductSchema); 