'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Map extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Map.hasMany(models.Like, {foreignKey: 'mapId'})
      models.Map.hasMany(models.Map_store, {foreignKey: 'mapId'})
      models.Map.belongsTo(models.User, {foreignKey: 'userId'})

    }
  }
  Map.init({
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Map',
  });
  return Map;
};