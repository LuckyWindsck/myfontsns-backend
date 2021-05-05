import { Router } from 'express';

import UserController from '../controllers/user-controller';
import { JSONAPIResponseInterceptor } from '../lib/json-api';
import { apiResource } from '../lib/route';

const UserRouter = Router();

UserRouter.use(JSONAPIResponseInterceptor);
apiResource(UserRouter, UserController);

export default UserRouter;
