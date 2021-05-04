import { Router } from 'express';

import { apiResource } from '../lib/route';
import { JSONAPIResponseInterceptor } from '../lib/json-api/response';
import UserController from '../controllers/userController';

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
