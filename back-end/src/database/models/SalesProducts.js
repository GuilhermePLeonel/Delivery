module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('SalesProducts', {
      saleId: {
        //   autoIncrement: true,
        //   primaryKey: true,
          type: DataTypes.INTEGER
      },
      productId: DataTypes.INTEGER ,
      quantity: DataTypes.INTEGER,
  }, {
      tableName: 'sales_products',
      underscored: true,
      timestamps: false
  })

  SalesProducts.associate = (models) => {
      models.Sales.belongsToMany(models.Sales, {
          as: 'sales', 
          foreignKey: 'saleId',
          otherKey: 'productId',
          through: SalesProducts,
      });
      models.Products.belongsToMany(models.Products, {
          as: 'products', 
          foreignKey: 'productId',
          otherKey: 'saleId',
          through: SalesProducts,
      });
  }

  return SalesProducts;
}  