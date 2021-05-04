const dotenv = require('dotenv');

dotenv.config();

const {
  POSTGRES_DB: database,
  POSTGRES_USER: username,
  POSTGRES_PASSWORD: password,
  LOGGING,
} = process.env;

if (!database || !username || !password) {
  console.error('Please make sure you filled all `POSTGRES_DB`, `POSTGRES_USER`, and `POSTGRES_PASSWORD` in .env');

  process.exit(1);
}

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
    logging,
  },
};
