'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Store.hasMany(models.Map_store, {foreignKey: 'storeId'})
      models.Store.hasMany(models.Review, {foreignKey: 'storeId'})
      models.Store.hasMany(models.Image, {foreignKey: 'storeId'})
      models.Store.hasMany(models.Store_category, {foreignKey: 'storeId'})      
    }
  }
  Store.init({
    name: DataTypes.STRING,
    kakaoId: DataTypes.STRING,    
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};