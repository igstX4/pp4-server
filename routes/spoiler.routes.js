const Router = require('express').Router;
const spoilerService = require('../services/spoiler.service');
const router = new Router();

router.post('/', async (req, res) => {
    try {
        const spoiler = await spoilerService.create(req.body);
        res.json(spoiler);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const spoilers = await spoilerService.getAll();
        res.json(spoilers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const spoiler = await spoilerService.getById(req.params.id);
        res.json(spoiler);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const spoiler = await spoilerService.update(req.params.id, req.body);
        res.json(spoiler);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await spoilerService.delete(req.params.id);
        res.json({ message: 'Спойлер успешно удален' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 