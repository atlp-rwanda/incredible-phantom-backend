'use strict';
import pkg from 'sequelize'
const { Model } = pkg;
// const {
//   Model
// } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Route.init({
    routeID: { type : DataTypes.INTEGER , allowNull: false },
    origin: { type : DataTypes.STRING , allowNull: false },
    destination: { type : DataTypes.STRING , allowNull: false },
    distance: { type : DataTypes.STRING , allowNull: true },
    busStops: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    sequelize,
    modelName: 'Route',
  });
  return Route;
};