import { config } from 'dotenv';
config();

module.exports = {
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
};
