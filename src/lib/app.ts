import express from 'express';

import { RootRouter, UserRouter } from '../routes';

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/', RootRouter);
app.use('/users', UserRouter);

export default app;
