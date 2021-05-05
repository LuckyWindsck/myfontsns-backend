const dotenv = require('dotenv');

dotenv.config();

const {
  POSTGRES_DB: database,
  POSTGRES_USER: username,
  POSTGRES_PASSWORD: password,
  DATABASE_URL: uri,
  LOGGING,
} = process.env;

const dialect = 'postgres';

const logging = LOGGING && !['false', 'off', 'no'].includes(LOGGING.toLowerCase());

module.exports = {
  development: {
    database,
    username,
    password,
    dialect,
    logging,
  },
  test: {
    database,
    username,
    password,
    dialect,
    logging,
  },
  production: {
    database,
    username,
    password,
    dialect,
    uri,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
