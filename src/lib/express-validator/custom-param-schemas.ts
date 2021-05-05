import type { Request } from 'express';
import type { ParamSchema, Schema, ValidationChain } from 'express-validator';
import { checkSchema } from 'express-validator';

export const shouldExist: ParamSchema = {
  exists: {
    errorMessage: 'Should exist',
  },
};

export const shouldNotExist: ParamSchema = {
  exists: {
    negated: true,
    errorMessage: 'Should not exist',
  },
};

export const shouldNotBeEmpty: ParamSchema = {
  notEmpty: {
    errorMessage: 'Should not be empty',
  },
};

export const shouldBeEmail: ParamSchema = {
  isEmail: {
    errorMessage: 'Should an email',
  },
};

export const shouldBeStrongPassword: ParamSchema = {
  isStrongPassword: {
    errorMessage: 'Should have at least 8 characters, 1 lowercase alphabet, 1 uppercase alphabet, 1 number, and 1 symbol.',
  },
};

export const checkBodySchema = (schema: Schema) => checkSchema(schema, ['body']);

export const useValidatorsSchema = (req: Request) => (schema: Schema) => async () => {
  const result = await checkBodySchema(schema)[0].run(req);

  result.throw();
};

export const useSanitizersSchema = (req: Request) => (schema: Schema) => async () => {
  const result = await checkBodySchema(schema)[0].run(req);

  return result.context.getData()[0].value;
};

export const runAllValidations = (validations: ValidationChain[]) => (req: Request) => (
  Promise.all(validations.map((validation) => validation.run(req)))
);
