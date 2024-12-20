const Category = require('../models/category.model');
const Product = require('../models/product.model');

class CategoryService {
    async create(categoryData) {
        // Проверяем существование категории с таким именем
        const existingCategory = await Category.findOne({ 
            name: { $regex: new RegExp(`^${categoryData.name}$`, 'i') } 
        });
        
        if (existingCategory) {
            throw new Error('Категория с таким именем уже существует');
        }

        const category = new Category(categoryData);
        return await category.save();
    }

    async getAll() {
        return await Category.find();
    }

    async getById(id) {
        return await Category.findById(id);
    }

    async update(id, categoryData) {
        // Проверяем, не пытаемся ли мы обновить "Общую категорию"
        const category = await Category.findById(id);
        if (category.name === 'Общая категория') {
            throw new Error('Невозможно изменить общую категорию');
        }

        // Проверяем существование другой категории с таким именем
        const existingCategory = await Category.findOne({
            name: { $regex: new RegExp(`^${categoryData.name}$`, 'i') },
            _id: { $ne: id }
        });
        
        if (existingCategory) {
            throw new Error('Категория с таким именем уже существует');
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            id, 
            categoryData, 
            { new: true }
        );

        await Product.updateMany(
            { category: id },
            { $set: { categoryName: categoryData.name } }
        );

        return updatedCategory;
    }

    async delete(id) {
        // Проверяем, не пытаемся ли мы удалить "Общую категорию"
        const category = await Category.findById(id);
        if (category.name === 'Общая категория') {
            throw new Error('Невозможно удалить общую категорию');
        }

        let generalCategory = await Category.findOne({ name: 'Общая категория' });
        
        if (!generalCategory) {
            generalCategory = await Category.create({ name: 'Общая категория' });
        }

        await Product.updateMany(
            { category: id },
            { 
                $set: { 
                    category: generalCategory._id,
                    categoryName: 'Общая категория'
                } 
            }
        );

        return await Category.findByIdAndDelete(id);
    }
}

module.exports = new CategoryService(); 