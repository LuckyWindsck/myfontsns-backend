import express from 'express';

import Router from '../routes';
import errorHanlder from '../util/express/error-handler';

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/', Router);

app.use(errorHanlder);

export default app;
