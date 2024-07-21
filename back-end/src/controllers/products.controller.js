const GetProducts = require('../services/products.service');

async function ProductsAll(_req, res) {
    const produto = await GetProducts();
    res.status(200).json(produto);
}
module.exports = ProductsAll;