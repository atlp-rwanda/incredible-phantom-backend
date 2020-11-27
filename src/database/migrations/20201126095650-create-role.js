<<<<<<< HEAD
<<<<<<< HEAD
=======
'use strict';
>>>>>>> ch-CRUD-role
=======
>>>>>>> feat(Roles & Permissions): Setting Roles and Permissions
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
<<<<<<< HEAD
<<<<<<< HEAD
        type: Sequelize.INTEGER,
=======
        type: Sequelize.INTEGER
>>>>>>> ch-CRUD-role
=======
        type: Sequelize.INTEGER,
>>>>>>> feat(Roles & Permissions): Setting Roles and Permissions
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Roles');
  },
<<<<<<< HEAD
};
=======
};
>>>>>>> feat(Roles & Permissions): Setting Roles and Permissions
