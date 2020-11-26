'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
  await queryInterface.bulkInsert('Roles', [
    {
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      role: 'operator',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      role: 'driver',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);
    
  },

  
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  },
};
