require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const adminRouter = require('./routes/admin.routes');
const categoryRouter = require('./routes/category.routes');
const productRouter = require('./routes/product.routes');
const spoilerRouter = require('./routes/spoiler.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Роуты
app.use('/api/admin', adminRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/spoilers', spoilerRouter);

const PORT = process.env.PORT || 5000;

async function start() {
    try {
        await mongoose.connect('mongodb+srv://user123:gBaURWBwWQtyQ66R@cluster0.krpru.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
    } catch (error) {
        console.log('Ошибка при запуске сервера:', error);
    }
}

start(); 