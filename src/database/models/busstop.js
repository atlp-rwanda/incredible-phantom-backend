'use strict';
import pkg from 'sequelize';
const { Model } = pkg;
module.exports = (sequelize, DataTypes) => {
  class busStop extends Model {
    static associate(models) {
    }
  };
  busStop.init({
    busStopId: {type:DataTypes.INTEGER,allowNull: false, unique: true},
    coordinates: {type:DataTypes.STRING,allowNull: false, unique: true},
    sector: {type: DataTypes.STRING, allowNull: false},
    cell: {type: DataTypes.STRING, allowNull: false},
  }, {
    sequelize,
    modelName: 'busStop',
  });
  return busStop;
};