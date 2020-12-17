require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
    database: 'phantom_test',
    username: 'postgres',
    password: 'postgres'
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
  },
};
