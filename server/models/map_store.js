'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Map_store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Map_store.belongsTo(models.Map, {foreignKey: 'mapId'})
      models.Map_store.belongsTo(models.Store, {foreignKey: 'storeId'})      
    }
  }
  Map_store.init({
    map_id: DataTypes.INTEGER,
    store_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Map_store',
  });
  return Map_store;
};