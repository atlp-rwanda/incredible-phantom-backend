'use strict';
import pkg from 'sequelize';
const { Model } = pkg;

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
    start: { type : DataTypes.STRING, allowNull : true },
    end: { type : DataTypes.STRING, allowNull : true },
    distance: { type : DataTypes.STRING, allowNull : true }
  }, {
    sequelize,
    modelName: 'Route',
  });
  return Route;
};