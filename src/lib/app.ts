import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import Router from '../routes';
import errorHanlder from '../util/express/error-handler';

const secret = process.env.SESSION_SECRET;
// TODO: Find a better error to throw
if (!secret) throw new Error();

const app = express();

// TODO: Configurate cors
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(cookieParser(secret));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/', Router);

app.use(errorHanlder);

export default app;
