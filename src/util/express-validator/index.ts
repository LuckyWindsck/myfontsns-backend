import type { Request } from 'express';
import type { ErrorFormatter, Schema, ValidationChain } from 'express-validator';
import { checkSchema, validationResult } from 'express-validator';

import { ValidationError } from '../errors';

const checkBodySchema = (schema: Schema) => checkSchema(schema, ['body']);

const useValidatorsSchema = (req: Request) => (schema: Schema) => async () => {
  const result = await checkBodySchema(schema)[0].run(req);

  result.throw();
};

const useSanitizersSchema = (req: Request) => (schema: Schema) => async () => {
  const result = await checkBodySchema(schema)[0].run(req);

  return result.context.getData()[0].value;
};

const errorFormatter: ErrorFormatter = ({
  location: _location,
  msg,
  param: _param,
  value: _value,
  nestedErrors: _nestedErrors,
}) => msg;

const runAllValidations = async (validations: ValidationChain[], req: Request) => {
  try {
    await Promise.all(validations.map((validation) => validation.run(req)));
    validationResult(req).formatWith(errorFormatter).throw();
  } catch (errors) {
    throw new ValidationError(errors);
  }
};

export {
  checkBodySchema,
  useValidatorsSchema,
  useSanitizersSchema,
  errorFormatter,
  runAllValidations,
};
