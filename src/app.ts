import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import express from 'express';

dotenv.config();

const {
  POSTGRES_DB: database,
  POSTGRES_USER: username,
  POSTGRES_PASSWORD: password,
} = process.env;

if (!database || !username || !password) {
  process.exit(1);
}

const sequelize = new Sequelize(database, username, password, { dialect: 'postgres' });

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export { app };
export { sequelize };

export default {
  app,
  sequelize,
};
