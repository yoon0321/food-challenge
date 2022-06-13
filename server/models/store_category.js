'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Store_category.belongsTo(models.Store, {foreignKey: 'storeId'})
      models.Store_category.belongsTo(models.Category, {foreignKey: 'categoryId'})
    }
  }
  Store_category.init({
    store_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Store_category',
  });
  return Store_category;
};