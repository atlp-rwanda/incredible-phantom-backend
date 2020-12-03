module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Buses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: false
      },
      plateNo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      
      seats: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true 
      },
      status: {
        type: Sequelize.STRING, 
        defaultValue:"stop"
      },
      commuters: {
        type: Sequelize.INTEGER, 
        defaultValue: 0
      },
      type: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Buses');
  }
};
