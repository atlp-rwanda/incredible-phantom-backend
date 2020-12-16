const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bus extends Model {
    static associate(models) {}
  }

  Bus.init(
    {
      brand: { type: DataTypes.STRING, allowNull: false },
      plateNo: { type: DataTypes.STRING, allowNull: false, unique: true },
      seats: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Bus'
    }
  );
  return Bus;
};
