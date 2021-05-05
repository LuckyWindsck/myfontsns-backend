import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.js')[env];

const options = (
  config.uri
    ? [config.uri, config]
    : [config.database, config.username, config.password, config]
);

const db = new Sequelize(...options);

export default db;
