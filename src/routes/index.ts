import { Router } from 'express';

import UserController from '../controllers/userController';
import { JSONAPIResponseInterceptor } from '../lib/json-api/response';
import { apiResource } from '../lib/route';

const rootRouter = Router();
const userRouter = Router();

rootRouter.get('/', (req, res) => {
  res.send('Hello World!');
});

userRouter.use(JSONAPIResponseInterceptor);
apiResource(userRouter, UserController);

export {
  rootRouter,
  userRouter,
};
