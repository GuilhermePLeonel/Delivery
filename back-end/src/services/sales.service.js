const { Sales } = require("../database/models");
const { SalesProducts } = require("../database/models");

const toSnakeCase = (e) =>
  e
    .match(/([A-Z])/g)
    .reduce((str, c) => str.replace(new RegExp(c), `_${c.toLowerCase()}`), e)
    .substring(e.slice(0, 1).match(/([A-Z])/g) ? 1 : 0);

const create = async (array, product) =>
  SalesProducts.create({
    saleId: array[array.length - 1],
    productId: product.productId,
    quantity: product.quantity,
  });

const createSales = async ({
  userId,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  dateTime,
  sellerId,
  saleInfos,
}) => {
  await Sales.create({
    [toSnakeCase("userId")]: userId,
    [toSnakeCase("totalPrice")]: totalPrice,
    [toSnakeCase("deliveryAddress")]: deliveryAddress,
    [toSnakeCase("deliveryNumber")]: deliveryNumber,
    [toSnakeCase("saleDate")]: Date.parse(dateTime),
    [toSnakeCase("sellerId")]: sellerId,
    status: "Pendente",
  });
  const result = await Sales.findAll({ where: { userId } });
  const array = [];
  result.map((sale) => array.push(sale.dataValues.id));
  saleInfos.map(async (product) => create(array, product));
  return "Passou na service";
};

const updateSales = async (saleId, newStatus) => {
  try {
    const result = await Sales.update(
      { status: newStatus },
      {
        where: { id: saleId },
      }
    );

    if (result[0] === 1) {
      return {
        success: true,
        message: "Status da venda atualizado com sucesso.",
      };
    } else {
      return {
        success: false,
        message: "Venda não encontrada ou status não atualizado.",
      };
    }
  } catch (error) {
    console.error("Erro ao atualizar o status da venda:", error);
    return { success: false, message: "Erro ao atualizar o status da venda." };
  }
};

module.exports = {
  createSales,
  updateSales,
};
