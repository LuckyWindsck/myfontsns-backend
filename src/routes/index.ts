import { Router } from 'express';

import { apiResource } from '../lib/route';
import UserController from '../controllers/userController';

const rootRouter = Router();
const userRouter = Router();

rootRouter.get('/', (req, res) => {
  res.send('Hello World!');
});

apiResource(userRouter, UserController);

export {
  rootRouter,
  userRouter,
};
