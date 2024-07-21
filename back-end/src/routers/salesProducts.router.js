const express = require('express');
const salesProductsController = require('../controllers/salesProducts.controller');

const router = express.Router();

router.get('/', salesProductsController.getAllSalesProducts);
// router.get('/', salesController.getSaleByEmail);
// router.get('/:id', userController.getUserById);

module.exports = router;