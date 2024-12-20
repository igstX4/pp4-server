const Router = require('express').Router;
const adminService = require('../services/admin.service');
const router = new Router();

// Middleware для проверки токена
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Не авторизован' });
        }

        const userData = await adminService.getMe(token);
        if (!userData.isAdmin) {
            return res.status(403).json({ message: 'Нет доступа' });
        }

        req.user = userData;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Не авторизован' });
    }
};

// Новые роуты для аутентификации
router.post('/login', async (req, res) => {
    try {
        const { password, login } = req.body;
        const data = await adminService.login(password, login);
        res.json(data);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

router.get('/me', authMiddleware, async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const userData = await adminService.getMe(token);
        res.json(userData);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

// Защитим все остальные роуты middleware'ом
router.use(authMiddleware);

router.post('/', async (req, res) => {
    try {
        const admin = await adminService.create(req.body);
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const admins = await adminService.getAll();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const admin = await adminService.getById(req.params.id);
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const admin = await adminService.update(req.params.id, req.body);
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await adminService.delete(req.params.id);
        res.json({ message: 'Админ успешно удален' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 