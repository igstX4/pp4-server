const Product = require('../models/product.model');
const Category = require('../models/category.model');

class ProductService {
    async create(productData) {
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
            
            const product = new Product(productData);
            return await product.save();
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        return await Product.find().populate('category', 'name');
    }

    async getById(id) {
        return await Product.findById(id).populate('category', 'name');
    }

    async update(id, productData) {
        try {
            if (productData.category) {
                const category = await Category.findById(productData.category);
                if (category) {
                    productData.categoryName = category.name;
                }
            }

            return await Product.findByIdAndUpdate(id, productData, { new: true });
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        const product = await Product.findById(id);
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