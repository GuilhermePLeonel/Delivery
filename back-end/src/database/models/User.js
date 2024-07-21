module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement:true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    
  }, {
    tableName: 'users',
    timestamps: false,
    underscored: true,
  });
  User.associate = (model) => {
    User.hasMany(model.Sales, {
      foreignKey: 'userId',
      as: 'user',
    });
    User.hasMany(model.Sales, {
      foreignKey: 'sellerId',
      as: 'seller',
    });
  }
  return User;
};