import { matchedData } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

import type { Controller } from '../lib/controller';
import db from '../lib/db';
import { User } from '../models';
import { checkBodySchema, runAllValidations } from '../util/express-validator';
import { shouldExist, shouldNotBeEmpty } from '../util/express-validator/custom-param-schemas';
import { docWithData } from '../util/json-api';

const PostController: Controller = class PostController {
  // display a list of all posts
  static index = async (req, res, next) => {
    try {
      const user = await User.getById(req.params.userId);
      console.log(user.getPosts);
      const posts = await user.getPosts();
      const dataResponse = posts.map((post) => post.convert());

      res.send(docWithData(dataResponse));
    } catch (error) {
      next(error);
    }
  }

  // create a new post
  static create = async (req, res, next) => {
    try {
      const user = await User.getById(req.params.userId);

      const validations = checkBodySchema({
        content: {
          ...shouldExist,
          ...shouldNotBeEmpty,
        },
      });

      await runAllValidations(validations, req);

      const validatedPostData = matchedData(req);
      const { content } = validatedPostData;

      const post = await db.transaction((t) => (
        user.createPost({ content }, { transaction: t })
      ));
      const dataResponse = post.convert();

      res.status(StatusCodes.CREATED).send(docWithData(dataResponse));
    } catch (error) {
      next(error);
    }
  }
};

export default PostController;
