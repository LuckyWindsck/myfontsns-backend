import type { RequestHandler } from 'express';

import { Session } from '../../models';
import { UnauthorizedError } from '../errors';

const requireAuthentification: RequestHandler = async (req, res, next) => {
  try {
    const { sid } = req.signedCookies;
    if (!sid) throw new UnauthorizedError();

    const session = await Session.findOne({ where: { sid } });
    if (!session) throw new UnauthorizedError();

    const now = new Date();
    if (session.expires < now) throw new UnauthorizedError();

    next();
  } catch (error) {
    next(error);
  }
};

export {
  // eslint-disable-next-line import/prefer-default-export
  requireAuthentification,
};
