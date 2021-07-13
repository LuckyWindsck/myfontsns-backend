import { Router } from 'express';

import FontController from '../controllers/font-controller';

const FontRouter = Router({ mergeParams: true });

if (FontController.index) FontRouter.route('/').get(FontController.index);
if (FontController.create) FontRouter.route('/').post(FontController.create);

export default FontRouter;
