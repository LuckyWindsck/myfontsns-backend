import * as JSONAPI from 'jsonapi-typescript';
import { ReasonPhrases } from 'http-status-codes';
import { ErrorFormatter, Result } from 'express-validator';

const errorFormatter: ErrorFormatter = ({
  location: _location,
  msg,
  param: _param,
  value: _value,
  nestedErrors: _nestedErrors,
}) => msg;

const validationError = (errors: Result) => {
  const error: JSONAPI.ErrorObject = {
    status: ReasonPhrases.UNPROCESSABLE_ENTITY,
    title: 'ValidationError',
    meta: errors.mapped ? errors.mapped() : errors,
  };

  return error;
};

export {
  errorFormatter,
  validationError,
};
