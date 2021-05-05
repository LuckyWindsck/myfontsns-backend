import { Router } from 'express';

import { JSONAPIResponseInterceptor } from '../util/json-api';

import UserRouter from './user-router';

const APIRouter = Router();

APIRouter.use(JSONAPIResponseInterceptor);
APIRouter.use('/users', UserRouter);

export default APIRouter;
