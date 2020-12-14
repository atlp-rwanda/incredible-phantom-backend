const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bus extends Model {
    static associate(models) {
      models.Bus.belongsTo(models.Route, {
        foreignKey: 'routeID',
      });
    }
  }
  Bus.init(
    {
      brand: { type: DataTypes.STRING, allowNull: false },
      plateNo: { type: DataTypes.STRING, allowNull: false, unique: true },
      driver: { type: DataTypes.STRING, allowNull: false },
      seats: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Bus'
    }
  );
  return Bus;
};
