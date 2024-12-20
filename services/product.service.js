const Product = require('../models/product.model');
const Category = require('../models/category.model');
const fs = require('fs').promises;
const path = require('path');

class ProductService {
    async create(productData, file) {
        try {
            if (productData.category) {
                const category = await Category.findById(productData.category);
                if (category) {
                    productData.categoryName = category.name;
                } else {
                    const generalCategory = await Category.findOne({ name: 'Общая категория' }) 
                        || await Category.create({ name: 'Общая категория' });
                    productData.category = generalCategory._id;
                    productData.categoryName = 'Общая категория';
                }
            }

            productData.img = file.filename;
            
            const product = new Product(productData);
            return await product.save();
        } catch (error) {
            if (file) {
                await fs.unlink(path.join('uploads/products', file.filename));
            }
            throw error;
        }
    }

    async getAll() {
        return await Product.find().populate('category', 'name');
    }

    async getById(id) {
        return await Product.findById(id).populate('category', 'name');
    }

    async update(id, productData, file) {
        try {
            if (productData.category) {
                const category = await Category.findById(productData.category);
                if (category) {
                    productData.categoryName = category.name;
                }
            }

            if (file) {
                const oldProduct = await Product.findById(id);
                if (oldProduct.img) {
                    await fs.unlink(path.join('uploads/products', oldProduct.img));
                }
                productData.img = file.filename;
            }

            return await Product.findByIdAndUpdate(id, productData, { new: true });
        } catch (error) {
            if (file) {
                await fs.unlink(path.join('uploads/products', file.filename));
            }
            throw error;
        }
    }

    async delete(id) {
        const product = await Product.findById(id);
        if (product.img) {
            await fs.unlink(path.join('uploads/products', product.img));
        }
        return await Product.findByIdAndDelete(id);
    }

    async toggleVisibility(id) {
        const product = await Product.findById(id);
        product.isVisible = !product.isVisible;
        return await product.save();
    }

    async setReleaseDate(id, date) {
        return await Product.findByIdAndUpdate(
            id, 
            { freeDate: date },
            { new: true }
        );
    }

    async toggleCommission(id) {
        const product = await Product.findById(id);
        product.isCommission = !product.isCommission;
        return await product.save();
    }
}

module.exports = new ProductService(); 