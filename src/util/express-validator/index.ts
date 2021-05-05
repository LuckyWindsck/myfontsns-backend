import type { Request } from 'express';
import type { ErrorFormatter, Schema, ValidationChain } from 'express-validator';
import { checkSchema } from 'express-validator';

const checkBodySchema = (schema: Schema) => checkSchema(schema, ['body']);

const useValidatorsSchema = (req: Request) => (schema: Schema) => async () => {
  const result = await checkBodySchema(schema)[0].run(req);

  result.throw();
};

const useSanitizersSchema = (req: Request) => (schema: Schema) => async () => {
  const result = await checkBodySchema(schema)[0].run(req);

  return result.context.getData()[0].value;
};

const runAllValidations = (validations: ValidationChain[]) => (req: Request) => (
  Promise.all(validations.map((validation) => validation.run(req)))
);

const errorFormatter: ErrorFormatter = ({
  location: _location,
  msg,
  param: _param,
  value: _value,
  nestedErrors: _nestedErrors,
}) => msg;

export {
  checkBodySchema,
  useValidatorsSchema,
  useSanitizersSchema,
  runAllValidations,
  errorFormatter,
};
