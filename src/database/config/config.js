require('dotenv').config();

const { DEV_DATABASE_URL, DATABASE_URL, TEST_DATABASE_URL } = process.env;

module.exports = {
  development: {
    url: DEV_DATABASE_URL,
    dialect: 'postgres',
  },
  test: {
    url: TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: DATABASE_URL,
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
  },
};
