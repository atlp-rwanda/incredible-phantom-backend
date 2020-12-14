module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('busStops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      busStopId: {
        allowNull: false,
        unique: true,
        type: Sequelize.INTEGER,
      },
      coordinates: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      sector: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cell: {
        allowNull: false,
        type: Sequelize.STRING,
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
  down: async (queryInterface) => {
    await queryInterface.dropTable('busStops');
  },
};
