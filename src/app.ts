import express from 'express';

import { rootRouter, userRouter } from './routes';
import { sequelize } from './models';

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/', rootRouter);
app.use('/users', userRouter);

export { app, sequelize };
