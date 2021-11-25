import bcrypt from 'bcrypt';
import { matchedData } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';

import type { Controller } from '../lib/controller';
import db from '../lib/db';
import { Session, User } from '../models';
import { UnauthorizedError } from '../util/errors';
import { checkBodySchema, runAllValidations } from '../util/express-validator';
import { shouldExist, shouldNotBeEmpty } from '../util/express-validator/custom-param-schemas';
import { docWithData } from '../util/json-api';

const SessionController: Controller = class SessionController {
  // create a new session (Login)
  static create = async (req, res, next) => {
    try {
      const validations = checkBodySchema({
        name: {
          ...shouldExist,
          ...shouldNotBeEmpty,
        },
        password: {
          ...shouldExist,
          ...shouldNotBeEmpty,
        },
      });

      await runAllValidations(validations, req);

      const validatedUserData = matchedData(req);
      const { name, password } = validatedUserData;

      const user = await User.findOne({ where: { name } });
      if (user === null) throw new UnauthorizedError();

      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new UnauthorizedError();

      const sid = uuidv4();

      const data = JSON.stringify(user.get());

      const maxAge = 60000;
      const expires = new Date(Date.now() + maxAge);

      const session = await db.transaction((t) => (
        Session.create({ sid, data, expires }, { transaction: t })
      ));
      const dataResponse = session.convert();

      res.cookie('sid', sid, {
        maxAge,
        httpOnly: false,
        sameSite: false,
        secure: false,
        signed: true,
      });

      res.status(StatusCodes.CREATED).send(docWithData(dataResponse));
    } catch (error) {
      next(error);
    }
  }

  // delete a specific session (Logout)
  static destroy = async (req, res, next) => {
    try {
      const { sid } = req.signedCookies;
      // TODO: Find a better error to throw
      if (!sid) throw new Error();

      const session = await Session.findOne({ where: { sid } });
      // TODO: Find a better error to throw
      if (!session) throw new Error();

      await db.transaction((t) => session.destroy({ transaction: t }));

      // TODO: Which status code to use? 200 or 204?
      res.send(docWithData([]));
    } catch (error) {
      next(error);
    }
  }
};

export default SessionController;
