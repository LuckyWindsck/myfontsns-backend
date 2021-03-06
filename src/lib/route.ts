import type { Router } from 'express';

import type { Controller } from './controller';

const apiResource = (router: Router, controller: Controller) => {
  if (controller.index) router.route('/').get(controller.index);
  if (controller.create) router.route('/').post(controller.create);
  if (controller.show) router.route('/:id').get(controller.show);
  if (controller.update) router.route('/:id').put(controller.update).patch(controller.update);
  if (controller.destroy) router.route('/:id').delete(controller.destroy);
};

export {
  // eslint-disable-next-line import/prefer-default-export
  apiResource,
};
