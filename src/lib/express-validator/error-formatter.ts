import type { ErrorFormatter, Result } from 'express-validator';
import { ReasonPhrases } from 'http-status-codes';
import type * as JSONAPI from 'jsonapi-typescript';

export const errorFormatter: ErrorFormatter = ({
  location: _location,
  msg,
  param: _param,
  value: _value,
  nestedErrors: _nestedErrors,
}) => msg;

export const validationError = (errors: Result) => {
  const errorResponse: JSONAPI.ErrorObject = {
    status: ReasonPhrases.UNPROCESSABLE_ENTITY,
    title: 'ValidationError',
    meta: errors.mapped ? errors.mapped() : errors,
  };

  return errorResponse;
};
