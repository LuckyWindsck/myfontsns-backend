const dotenv = require('dotenv');

dotenv.config();

const {
  POSTGRES_DB: database,
  POSTGRES_USER: username,
  POSTGRES_PASSWORD: password,
} = process.env;

const dialect = 'postgres';

module.exports = {
  development: {
    database,
    username,
    password,
    dialect,
  },
  test: {
    database,
    username,
    password,
    dialect,
  },
  production: {
    database,
    username,
    password,
    dialect,
  },
};
