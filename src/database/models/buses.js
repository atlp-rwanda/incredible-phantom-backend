'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Buses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Buses.init({
    driver: DataTypes.STRING,
    busCompany: DataTypes.STRING,
    busPlate: DataTypes.STRING,
    brand: DataTypes.STRING,
    routeId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Buses',
  });
  return Buses;
};