import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.js')[env];

const db = new Sequelize(config.database, config.username, config.password, config);

export default db;
