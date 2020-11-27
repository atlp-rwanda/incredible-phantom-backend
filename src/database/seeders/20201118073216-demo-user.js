module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'fake@gmail.com',
        nationalId: 1197000000000000,
        password: '123abc',
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
        firstName: 'Guevara',
        lastName: 'Che',
        email: 'fake1@gmail.com',
        nationalId: 1198000000000000,
        password: '123abc',
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
        firstName: 'Egide',
        lastName: 'last',
        email: 'fake2@gmail.com',
        nationalId: 1199000000000000,
        password: '123abc',
        role: 'admin',
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