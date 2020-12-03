const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bus extends Model {
    static associate(models) {}
  }

  Bus.init(
    {
      brand: { type: DataTypes.STRING, allowNull: false },
      plateNo: { type: DataTypes.STRING, allowNull: false, unique: true },
      seats: { type: DataTypes.INTEGER, defaultValue: 0 },
      location: { type: DataTypes.STRING, allowNull: true },
      status: { type: DataTypes.STRING, defaultValue: 'stop' },
      commuters: { type: DataTypes.INTEGER, defaultValue: 0 },
      type: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Bus'
    }
  );
  return Bus;
};
