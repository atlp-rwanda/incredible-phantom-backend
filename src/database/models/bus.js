'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bus extends Model {
    static associate(models) {
      models.Bus.belongsTo(models.Route, {
        foreignKey: 'routeId',
        as: 'route',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }); 
    }
  };
  Bus.init({
    brand:{ type: DataTypes.STRING, allowNull: false, unique: true },
    plate: { type: DataTypes.STRING, allowNull: false, unique: true },
    driver: { type: DataTypes.STRING, allowNull: false, unique: true },
    routeId: { type: DataTypes.INTEGER},

   
    sequelize,
    modelName: 'Bus',
  });
  return Bus;
};