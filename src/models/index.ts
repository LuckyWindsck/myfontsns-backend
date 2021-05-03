/* eslint-disable global-require, import/no-dynamic-require */
import { Sequelize } from 'sequelize';
import UserInit from './user';

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.js')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const User = UserInit(sequelize);

export {
  sequelize,
  Sequelize,
};

export {
  User,
};
