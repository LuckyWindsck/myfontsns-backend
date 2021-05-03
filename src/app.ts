import express from 'express';
import { sequelize } from '../models';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export { app, sequelize };
