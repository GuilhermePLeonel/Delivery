const express = require('express');
const ProductsAll = require('../controllers/products.controller');

const router = express.Router();

router.get('/', ProductsAll);

module.exports = router;