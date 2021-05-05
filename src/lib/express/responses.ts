import type { Result } from 'express-validator';
import { ReasonPhrases } from 'http-status-codes';
import type * as JSONAPI from 'jsonapi-typescript';

const isSerializable = (value: any) => {
  try {
    JSON.parse(JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
};

export const resourceNotFound = () => {
  const errorResponse: JSONAPI.ErrorObject = {
    title: 'Resource not found',
    status: ReasonPhrases.NOT_FOUND,
  };

  return errorResponse;
};

export const internalServerError = (error: unknown) => {
  console.error(error);

  let detail = `The server encountered an internal error or misconfiguration and was unable to complete your request.
Please contact the server administrator and inform them of the time the error occurred and anything you might have done that may have caused the error.
More information about this error may be available in the server error log.`;

  if (error instanceof Error) {
    detail = error.toString();
  } else if (isSerializable(error)) {
    detail = JSON.stringify(error);
  }

  const errorResponse: JSONAPI.ErrorObject = {
    title: 'Internal Server Error',
    status: ReasonPhrases.INTERNAL_SERVER_ERROR,
    detail,
  };

  return errorResponse;
};

export const validationError = (errors: Result) => {
  const errorResponse: JSONAPI.ErrorObject = {
    status: ReasonPhrases.UNPROCESSABLE_ENTITY,
    title: 'ValidationError',
    meta: errors.mapped ? errors.mapped() : errors,
  };

  return errorResponse;
};
