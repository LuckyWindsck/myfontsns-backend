import * as express from 'express';

import APIRouter from './api-router';
import RootRouter from './root-router';

const Router = express.Router();

Router.use('/', RootRouter);
Router.use('/api', APIRouter);

export default Router;
