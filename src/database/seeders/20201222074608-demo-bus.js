'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Buses', [
     {
       brand:'KBS',
       plateNo: 'RAB200',
       type:'KBS',
       createdAt: new Date(),
       updatedAt: new Date(),
      },{
        brand:'Ritco',
        plateNo: 'RAB100',
        type:'KBS',
      
       createdAt: new Date(),
       updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Buses', null, {});
     
  }
};
