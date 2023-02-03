const express = require('express');
const path = require('path');
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const productsRouter = require('./products.router');
const salesRouter = require('./sales.router');
const salesProductsRouter = require('./salesProducts.router');

const routers = express.Router();
routers.use('/login', authRouter);
routers.use('/register', userRouter);
routers.use('/customer/products', productsRouter);
routers.use('/images', express.static(path.resolve('src/public')));
routers.use('/sales', salesRouter);
routers.use('/sales/products', salesProductsRouter);

module.exports = routers;