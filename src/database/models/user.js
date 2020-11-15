/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Bus, {
        as: 'bus',
        foreignKey: 'busId',
      });
      User.hasMany(models.Notification, {
        as: 'notifications',
        foreignKey: 'receiverId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  User.init(
    {
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      nationalId: { type: DataTypes.BIGINT, allowNull: false, unique: true },
      role: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      language: DataTypes.STRING,
      comfirmed: DataTypes.BOOLEAN,
      verficationLink: DataTypes.STRING,
      resetLink: DataTypes.STRING,
      busId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
