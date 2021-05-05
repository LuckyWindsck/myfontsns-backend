import { body, matchedData, validationResult } from 'express-validator';
// TODO: remove faker
import faker from 'faker';
import { StatusCodes } from 'http-status-codes';
import type { ErrorObject } from 'jsonapi-typescript';

import type { Controller } from '../lib/controller';
import db from '../lib/db';
import {
  checkBodySchema,
  errorFormatter,
  runAllValidations,
  useSanitizersSchema,
  useValidatorsSchema,
} from '../lib/express-validator';
import {
  shouldBeEmail,
  shouldBeStrongPassword,
  shouldExist,
  shouldNotBeEmpty,
  shouldNotExist,
} from '../lib/express-validator/custom-param-schemas';
import { internalServerError, resourceNotFound, validationError } from '../lib/express/responses';
import { docWithData, docWithErrors } from '../lib/json-api';
import { User } from '../models';

const getUserById = async (id: string) => {
  let result: ErrorObject | User | null = await User.findByPk(id);

  if (result === null) {
    result = resourceNotFound();
  }

  return result;
};

const UserController: Controller = class UserController {
  // display a list of all users
  static index = async (req, res) => {
    let users;

    try {
      users = await User.findAll();
    } catch (error) {
      const errorResponse = internalServerError(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(docWithErrors(errorResponse));
    }

    const dataResponse = users.map((user) => user.convert());
    return res.send(docWithData(dataResponse));
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
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(docWithErrors(errorResponse));
    }

    const validatedUserData = matchedData(req);
    const { screenName, email, password } = validatedUserData;

    let user;

    try {
      user = await db.transaction((t) => (
        User.create({
          name: faker.random.alphaNumeric(15),
          screenName,
          email,
          password,
        }, { transaction: t })
      ));
    } catch (error) {
      const errorResponse = internalServerError(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(docWithErrors(errorResponse));
    }

    const dataResponse = user.convert();
    return res.status(StatusCodes.CREATED).send(docWithData(dataResponse));
  }

  // display a specific user
  static show = async (req, res) => {
    let result: ErrorObject | User;

    try {
      result = await getUserById(req.params.id);
    } catch (error) {
      const errorResponse = internalServerError(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(docWithErrors(errorResponse));
    }

    if (!(result instanceof User)) {
      return res.status(StatusCodes.NOT_FOUND).send(docWithErrors(result));
    }

    const user = result;

    const dataResponse = user.convert();
    return res.send(docWithData(dataResponse));
  }

  // update a specific user
  static update = async (req, res) => {
    const useValidators = useValidatorsSchema(req);
    const useSanitizers = useSanitizersSchema(req);

    let result: ErrorObject | User;

    try {
      result = await getUserById(req.params.id);
    } catch (error) {
      const errorResponse = internalServerError(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(docWithErrors(errorResponse));
    }

    if (!(result instanceof User)) {
      const errorResponse = result;
      return res.status(StatusCodes.NOT_FOUND).send(docWithErrors(errorResponse));
    }

    const user = result;

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
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(docWithErrors(errorResponse));
    }

    const validatedUserData = matchedData(req);

    try {
      await db.transaction((t) => user.update(validatedUserData, { transaction: t }));
    } catch (error) {
      const errorResponse = internalServerError(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(docWithErrors(errorResponse));
    }

    // Should refresh  user instance is created before updated, and sequelize
    // might set with a different value according to setters.
    const dataResponse = (await user.reload()).convert();
    return res.send(docWithData(dataResponse));
  }

  // delete a specific user
  static destroy = async (req, res) => {
    let result: ErrorObject | User;

    try {
      result = await getUserById(req.params.id);
    } catch (error) {
      const errorResponse = internalServerError(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(docWithErrors(errorResponse));
    }

    if (!(result instanceof User)) {
      const errorResponse = result;
      return res.status(StatusCodes.NOT_FOUND).send(docWithErrors(errorResponse));
    }

    const user = result;

    try {
      await db.transaction((t) => user.destroy({ transaction: t }));
    } catch (error) {
      const errorResponse = internalServerError(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(docWithErrors(errorResponse));
    }

    const dataResponse = user.convert();
    return res.send(docWithData(dataResponse));
  }
};

export default UserController;
