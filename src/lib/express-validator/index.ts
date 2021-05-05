import type { Request } from 'express';
import type { ErrorFormatter, Schema, ValidationChain } from 'express-validator';
import { checkSchema } from 'express-validator';

export const errorFormatter: ErrorFormatter = ({
  location: _location,
  msg,
  param: _param,
  value: _value,
  nestedErrors: _nestedErrors,
}) => msg;

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
