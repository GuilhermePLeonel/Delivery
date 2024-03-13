const { Products } = require("../database/models");

const GetProducts = async () => {
  const productsAll = await Products.findAll();
  return productsAll;
};
module.exports = GetProducts;
