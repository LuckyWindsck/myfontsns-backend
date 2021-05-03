import express from 'express';
import { sequelize, User } from '../models';

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/users', async (req, res) => {
  const user = await User.create(req.body);

  res.status(201).send(user);
});

export { app, sequelize };
