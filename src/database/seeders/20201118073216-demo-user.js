module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Admin',
        lastName: 'Doe',
        email: 'admin@gmail.com',
        nationalId: 1197000000000000,
        password:
          '$2b$10$8WdnrCR8QypWwkOP2aDTOeA.nRa695r8oZWqEQX6EiV8egzT0vfqW',
        phone: '073222222',
        language: 'en',
        role: 'admin',
        comfirmed: false,
        verficationLink: '',
        resetLink: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Driver',
        lastName: 'Check',
        email: 'driver@gmail.com',
        nationalId: 1198000000000000,
        password:
          '$2b$10$8WdnrCR8QypWwkOP2aDTOeA.nRa695r8oZWqEQX6EiV8egzT0vfqW',
        role: 'driver',
        phone: '072222222',
        language: 'en',
        comfirmed: false,
        verficationLink: '',
        resetLink: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Operator',
        lastName: 'lastone',
        email: 'operator@gmail.com',
        nationalId: 1199000000000000,
        password:
          '$2b$10$8WdnrCR8QypWwkOP2aDTOeA.nRa695r8oZWqEQX6EiV8egzT0vfqW',
        role: 'operator',
        phone: '0788888888',
        language: 'en',
        comfirmed: false,
        verficationLink: '',
        resetLink: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};