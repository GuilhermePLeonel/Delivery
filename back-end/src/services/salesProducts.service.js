const { SalesProducts } = require('../database/models');

const AllSalesProducts = async () => {
    const salesProductsAll = await SalesProducts.findAll();
    return salesProductsAll;
};
module.exports = { AllSalesProducts };