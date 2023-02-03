const salesProductsService = require('../services/salesProducts.service');

async function getAllSalesProducts(_req, res) {
    const produtos = await salesProductsService.AllSalesProducts();
    res.status(200).json(produtos);
}
module.exports = { getAllSalesProducts };