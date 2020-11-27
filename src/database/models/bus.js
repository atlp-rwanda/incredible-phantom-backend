'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Bus.init({
    brand:{ type: DataTypes.STRING, allowNull: false, unique: true },
    plate: { type: DataTypes.STRING, allowNull: false, unique: true },
    driver: { type: DataTypes.STRING, allowNull: false, unique: true }
  }, {
    sequelize,
    modelName: 'Bus',
  });
  return Bus;
};