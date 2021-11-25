import { Router } from 'express';

import { JSONAPIResponseInterceptor } from '../util/json-api';

import SessionRouter from './session-router';
import UserRouter from './user-router';

const APIRouter = Router();

APIRouter.use(JSONAPIResponseInterceptor);
APIRouter.use('/sessions', SessionRouter);
APIRouter.use('/users', UserRouter);

export default APIRouter;
