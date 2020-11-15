import emitter from '../../utils/eventEmitter';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      Notification.belongsTo(models.User, {
        as: 'receiver',
        foreignKey: 'receiverId',
      });
    }
  }
  Notification.init(
    {
      is_read: DataTypes.BOOLEAN,
      content: DataTypes.STRING,
      receiverId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Notification',
    },
  );
  Notification.afterCreate = ({ dataValues }) => {
    emitter.emit('request created', dataValues);
  };
  return Notification;
};
