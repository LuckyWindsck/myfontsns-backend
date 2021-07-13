import { Router } from 'express';

import UserController from '../controllers/user-controller';
// Note: stop authentification temporarily
// import { requireAuthentification } from '../util/express/middleware';

import FontRouter from './font-router';
import PostRouter from './post-router';

const UserRouter = Router();

UserRouter.use('/:userId/fonts', FontRouter);
UserRouter.use('/:userId/posts', PostRouter);

// TODO: limit current user permission

// UserRouter.route('/').get(requireAuthentification);
if (UserController.index) UserRouter.route('/').get(UserController.index);

if (UserController.create) UserRouter.route('/').post(UserController.create);

// UserRouter.route('/:id').all(requireAuthentification);
if (UserController.show) UserRouter.route('/:userId').get(UserController.show);
if (UserController.update) UserRouter.route('/:userId').put(UserController.update).patch(UserController.update);
if (UserController.destroy) UserRouter.route('/:userId').delete(UserController.destroy);

export default UserRouter;
