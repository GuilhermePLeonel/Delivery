const salesService = require("../services/sales.service");
const { validateToken } = require("../utils/jwt.util");
const { Sales } = require("../database/models");

const createSales = async (req, res) => {
  const { authorization } = req.headers;
  const { message } = await validateToken(authorization);

  if (!authorization) {
    return res.status(401).json({ message: "Token not found" });
  }
  if (message) {
    return res.status(401).json({ message });
  }
  const sale = await salesService.createSales(req.body);
  if (sale === "Passou na service") {
    const { userId } = req.body;
    const result = await Sales.findAll({ where: { userId } });
    const array = [];
    result.map((s) => array.push(s.dataValues.id));
    return res.status(201).json({ id: array[array.length - 1] });
  }
};

const getAllSales = async (req, res) => {
  const result = await Sales.findAll();
  return res.status(201).json(result);
};

// const updateSales = async (req, res) => {
//   const saleId = req.params.id;
//   const newStatus = req.body.status;
//   const update = await salesService.updateSales(saleId, newStatus);
//   if (update.success) {
//     return res.status(200).json(update);
//   } else {
//     return res.status(404).json(update);
//   }
// };

// const getSaleStatusById = async (req, res) => {
//   const saleId = req.params.id;
//   const result = await salesService.getSaleStatusById(saleId);
//   if (result.length === 0) {
//     return res.status(404).json({
//       message: "Sale does not exist",
//     });
//   }
//   return res.status(200).json({
//     saleId: saleId,
//     status: result,
//   });
// };

module.exports = {
  createSales,
  getAllSales,
  // updateSales,
  // getSaleStatusById,
};
