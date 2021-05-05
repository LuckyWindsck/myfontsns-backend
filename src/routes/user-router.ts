import { Router } from 'express';

import UserController from '../controllers/user-controller';
import { apiResource } from '../lib/route';

const UserRouter = Router();

apiResource(UserRouter, UserController);

export default UserRouter;
