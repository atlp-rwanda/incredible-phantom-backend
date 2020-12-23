import pkg from 'sequelize';

const { Model } = pkg;
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    static associate(models) {}
  }
  Route.init(
    {
      routeID: { type: DataTypes.INTEGER, allowNull: false },
      origin: { type: DataTypes.STRING, allowNull: false },
      destination: { type: DataTypes.STRING, allowNull: false },
      distance: { type: DataTypes.STRING, allowNull: true },
      busStops: DataTypes.ARRAY(DataTypes.INTEGER),
      assignedBuses: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    {
      sequelize,
      modelName: 'Route'
    }
  );
  return Route;
};
