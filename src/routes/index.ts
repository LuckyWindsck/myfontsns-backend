import { Router } from 'express';

import { UserController } from '../controllers/user';

const rootRouter = Router();
const userRouter = Router();

rootRouter.get('/', (req, res) => {
  res.send('Hello World!');
});

userRouter.post('/users', UserController.create);

export {
  rootRouter,
  userRouter,
};
