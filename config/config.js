const dotenv = require('dotenv');

dotenv.config();

const {
  POSTGRES_DB: database,
  POSTGRES_USER: username,
  POSTGRES_PASSWORD: password,
} = process.env;

if (!database || !username || !password) {
  console.error('Please make sure you filled all `POSTGRES_DB`, `POSTGRES_USER`, and `POSTGRES_PASSWORD` in .env');

  process.exit(1);
}

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
