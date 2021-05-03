import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { User } from '../models';

class UserController {
  static create: RequestHandler = async (req, res) => {
    const user = await User.create(req.body);

    res.status(StatusCodes.CREATED).send(user);
  }
}

export {
  // eslint-disable-next-line import/prefer-default-export
  UserController,
};
