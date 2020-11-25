'use strict';
import pkg from 'sequelize';
const { Model } = pkg;

module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    static associate(models) {
     
    }
  };
  Route.init({
    start: { type : DataTypes.STRING, allowNull : true },
    end: { type : DataTypes.STRING, allowNull : true },
    distance: { type : DataTypes.STRING, allowNull : true }
  }, {
    sequelize,
    modelName: 'Route',
  });
  return Route;
};