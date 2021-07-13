import { Router } from 'express';

import PostController from '../controllers/post-controller';

const PostRouter = Router({ mergeParams: true });

if (PostController.index) PostRouter.route('/').get(PostController.index);
if (PostController.create) PostRouter.route('/').post(PostController.create);

export default PostRouter;
