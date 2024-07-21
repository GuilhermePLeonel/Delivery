'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales_products', {
      sale_id: {
        allowNull: false,
        // autoIncrement: true,
        // primaryKey: true,
        type: Sequelize.INTEGER,
        eference: {
          model: 'sales',
          key: 'id'
        },
      },
      product_id: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'products',
          key: 'id'
        },
      },
      quantity: {
        type: Sequelize.INTEGER
      },
    })
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sales_products');
  }
};
