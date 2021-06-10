import { Router } from 'express';

import UserController from '../controllers/user-controller';
import { requireAuthentification } from '../util/express/middleware';

const UserRouter = Router();

// TODO: limit current user permission

UserRouter.route('/').get(requireAuthentification);
if (UserController.index) UserRouter.route('/').get(UserController.index);

if (UserController.create) UserRouter.route('/').post(UserController.create);

UserRouter.route('/:id').all(requireAuthentification);
if (UserController.show) UserRouter.route('/:id').get(UserController.show);
if (UserController.update) UserRouter.route('/:id').put(UserController.update).patch(UserController.update);
if (UserController.destroy) UserRouter.route('/:id').delete(UserController.destroy);

export default UserRouter;
