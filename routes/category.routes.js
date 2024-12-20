const Router = require('express').Router;
const categoryService = require('../services/category.service');
const router = new Router();

router.post('/', async (req, res) => {
    try {
        const category = await categoryService.create(req.body);
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const categories = await categoryService.getAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const category = await categoryService.getById(req.params.id);
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const category = await categoryService.update(req.params.id, req.body);
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await categoryService.delete(req.params.id);
        res.json({ message: 'Категория успешно удалена' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 