'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AssignBus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  AssignBus.init({
    driver: DataTypes.STRING,
    busCompany: DataTypes.STRING,
    busPlate: DataTypes.STRING,
    brand: DataTypes.STRING,
    routeId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AssignBus',
  });
  return AssignBus;
};