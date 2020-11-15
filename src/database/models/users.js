'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    nationalId: DataTypes.BIGINT,
    role: DataTypes.STRING,
    phone: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};