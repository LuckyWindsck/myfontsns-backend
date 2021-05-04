import {
  body,
  matchedData,
  validationResult,
} from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import faker from 'faker';

import db from '../lib/db';
import { Controller, resourceNotFound } from '../lib/controller';
import { errorFormatter, validationError } from '../lib/express-validator/error-formatter';
import {
  shouldExist,
  shouldNotExist,
  shouldNotBeEmpty,
  shouldBeEmail,
  shouldBeStrongPassword,

  checkBodySchema,
  useValidatorsSchema,
  useSanitizersSchema,
  runAllValidations,
} from '../lib/express-validator/custom-param-schemas';
import { docWithData, docWithErrors } from '../lib/json-api/response';

import { User } from '../models';

const getUserById = async (id: string) => {
  const user = await User.findByPk(id);
  let notFound;

  if (user === null) notFound = resourceNotFound();

  return { user, notFound };
};

const UserController: Controller = class UserController {
  // display a list of all users
  static index = async (req, res) => {
    const users = await User.findAll();
    const data = users.map((user) => user.convert());

    res.send(docWithData(data));
  }

  // create a new user
  static create = async (req, res) => {
    const validations = checkBodySchema({
      name: {
        ...shouldNotExist,
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

    try {
      await runAllValidations(validations)(req);
      validationResult(req).formatWith(errorFormatter).throw();
    } catch (errors) {
      const errorResponse = validationError(errors);

      res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(docWithErrors(errorResponse));
      return;
    }

    const validatedUserData = matchedData(req);
    const { screenName, email, password } = validatedUserData;

    try {
      const user = await db.transaction((t) => (
        User.create({
          name: faker.random.alphaNumeric(15),
          screenName,
          email,
          password,
        }, { transaction: t })
      ));
      const data = user.convert();

      res.status(StatusCodes.CREATED).send(docWithData(data));
    } catch (error) {
      const errorResponse = validationError(error);

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(docWithErrors(errorResponse));
    }
  }

  // display a specific user
  static show = async (req, res) => {
    const { user, notFound } = await getUserById(req.params.id);

    if (notFound) {
      res.status(StatusCodes.NOT_FOUND).send(docWithErrors(notFound));

      return;
    }

    const data = user!.convert();

    res.send(docWithData(data));
  }

  // update a specific user
  static update = async (req, res) => {
    const useValidators = useValidatorsSchema(req);
    const useSanitizers = useSanitizersSchema(req);

    const { user, notFound } = await getUserById(req.params.id);

    if (notFound) {
      res.status(StatusCodes.NOT_FOUND).send(docWithErrors(notFound));

      return;
    }

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

    try {
      await runAllValidations(validations)(req);
      validationResult(req).formatWith(errorFormatter).throw();
    } catch (errors) {
      const errorResponse = validationError(errors);

      res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(docWithErrors(errorResponse));
      return;
    }

    const validatedUserData = matchedData(req);

    try {
      await db.transaction((t) => user!.update(validatedUserData, { transaction: t }));
      // Should refresh  user instance is created before updated, and sequelize
      // might set with a different value according to setters.
      const data = (await user!.reload()).convert();

      res.send(docWithData(data));
    } catch (error) {
      const errorResponse = validationError(error);

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(docWithErrors(errorResponse));
    }
  }

  // delete a specific user
  static destroy = async (req, res) => {
    const { user, notFound } = await getUserById(req.params.id);

    if (notFound) {
      res.status(StatusCodes.NOT_FOUND).send(docWithErrors(notFound));

      return;
    }

    try {
      await db.transaction((t) => user!.destroy({ transaction: t }));
      const data = user!.convert();

      res.send(docWithData(data));
    } catch (error) {
      const errorResponse = validationError(error);

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(docWithErrors(errorResponse));
    }
  }
};

export default UserController;
