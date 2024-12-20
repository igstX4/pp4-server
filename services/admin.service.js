const Admin = require('../models/admin.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

class AdminService {
    async create(adminData) {
        const admin = new Admin(adminData);
        return await admin.save();
    }

    async getAll() {
        return await Admin.find();
    }

    async getById(id) {
        return await Admin.findById(id);
    }

    async update(id, adminData) {
        return await Admin.findByIdAndUpdate(id, adminData, { new: true });
    }

    async delete(id) {
        return await Admin.findByIdAndDelete(id);
    }

    async login(password, login) {
        console.log(password, login)
        if (login !== 'admin') {
            throw new Error('Администратор не найден');
        }
        if (password !== ADMIN_PASSWORD) {
            throw new Error('Неверный пароль');
        }

        const token = jwt.sign(
            { isAdmin: true },
            JWT_SECRET,
            { expiresIn: '5d' }
        );

        return { token };
    }

    async getMe(token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            return {
                isAdmin: decoded.isAdmin,
                exp: decoded.exp
            };
        } catch (error) {
            throw new Error('Невалидный токен');
        }
    }
}

module.exports = new AdminService(); 