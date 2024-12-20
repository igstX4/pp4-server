const Router = require('express').Router;
const productService = require('../services/product.service');
const upload = require('../utils/multerConfig');
const router = new Router();

router.post('/', upload.single('img'), async (req, res) => {
    try {
        const product = await productService.create(req.body, req.file);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await productService.getAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await productService.getById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', upload.single('img'), async (req, res) => {
    try {
        const product = await productService.update(req.params.id, req.body, req.file);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await productService.delete(req.params.id);
        res.json({ message: 'Продукт успешно удален' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id/visibility', async (req, res) => {
    try {
        const product = await productService.toggleVisibility(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id/release-date', async (req, res) => {
    try {
        const product = await productService.setReleaseDate(req.params.id, req.body.date);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id/commission', async (req, res) => {
    try {
        const product = await productService.toggleCommission(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 