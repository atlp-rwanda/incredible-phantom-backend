"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [{
      role: 'operator',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      role: 'driver',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};