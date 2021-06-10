import { Router } from 'express';

import SessionController from '../controllers/session-controller';

const SessionRouter = Router();

if (SessionController.create) SessionRouter.route('/').post(SessionController.create);
if (SessionController.destroy) SessionRouter.route('/').delete(SessionController.destroy);

export default SessionRouter;
