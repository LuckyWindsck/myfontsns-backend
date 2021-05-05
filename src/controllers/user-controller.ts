import { body, matchedData } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

import type { Controller } from '../lib/controller';
import db from '../lib/db';
import { User } from '../models';
import {
  checkBodySchema,
  runAllValidations,
  useSanitizersSchema,
  useValidatorsSchema,
} from '../util/express-validator';
import {
  shouldBeEmail,
  shouldBeStrongPassword,
  shouldExist,
  shouldNotBeEmpty,
} from '../util/express-validator/custom-param-schemas';
import { docWithData } from '../util/json-api';

const UserController: Controller = class UserController {
  // display a list of all users
  static index = async (req, res, next) => {
    try {
      const users = await User.findAll();
      const dataResponse = users.map((user) => user.convert());

      res.send(docWithData(dataResponse));
    } catch (error) {
      next(error);
    }
  }

  // create a new user
  static create = async (req, res, next) => {
    try {
      const validations = checkBodySchema({
        name: {
          ...shouldExist,
          ...shouldNotBeEmpty,
        },
        screenName: {
          ...shouldExist,
          ...shouldNotBeEmpty,
        },
        email: {
          ...shouldExist,
          ...shouldNotBeEmpty,
          ...shouldBeEmail,
          normalizeEmail: true,
        },
        password: {
          ...shouldExist,
          ...shouldNotBeEmpty,
          ...shouldBeStrongPassword,
        },
      });

      await runAllValidations(validations, req);

      const validatedUserData = matchedData(req);
      const {
        name, screenName, email, password,
      } = validatedUserData;

      const user = await db.transaction((t) => (
        User.create({
          name, screenName, email, password,
        }, { transaction: t })
      ));
      const dataResponse = user.convert();

      res.status(StatusCodes.CREATED).send(docWithData(dataResponse));
    } catch (error) {
      next(error);
    }
  }

  // display a specific user
  static show = async (req, res, next) => {
    try {
      const user = await User.getById(req.params.id);
      const dataResponse = user.convert();

      res.send(docWithData(dataResponse));
    } catch (error) {
      next(error);
    }
  }

  // update a specific user
  static update = async (req, res, next) => {
    try {
      const useValidators = useValidatorsSchema(req);
      const useSanitizers = useSanitizersSchema(req);
      const validations = [
        body('name')
          .if(body('name').exists())
          .custom(useValidators({
            name: { ...shouldNotBeEmpty },
          })),
        body('screenName')
          .if(body('screenName').exists())
          .custom(useValidators({
            screenName: { ...shouldNotBeEmpty },
          })),
        body('email')
          .if(body('email').exists())
          .custom(useValidators({
            email: {
              ...shouldNotBeEmpty,
              ...shouldBeEmail,
            },
          }))
          .customSanitizer(useSanitizers({
            email: {
              normalizeEmail: true,
            },
          })),
        body('password')
          .if(body('password').exists())
          .custom(useValidators({
            password: {
              ...shouldNotBeEmpty,
              ...shouldBeStrongPassword,
            },
          })),
      ];

      const user = await User.getById(req.params.id);

      await runAllValidations(validations, req);

      const validatedUserData = matchedData(req);

      await db.transaction((t) => user.update(validatedUserData, { transaction: t }));

      // Should refresh user instance is created before updated, and sequelize
      // might set with a different value according to setters.
      const dataResponse = (await user.reload()).convert();

      res.send(docWithData(dataResponse));
    } catch (error) {
      next(error);
    }
  }

  // delete a specific user
  static destroy = async (req, res, next) => {
    try {
      const user = await User.getById(req.params.id);
      await db.transaction((t) => user.destroy({ transaction: t }));
      const dataResponse = user.convert();

      res.send(docWithData(dataResponse));
    } catch (error) {
      next(error);
    }
  }
};

export default UserController;
