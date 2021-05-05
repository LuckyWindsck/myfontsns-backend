import type { RequestHandler } from 'express';
import { ReasonPhrases } from 'http-status-codes';
import type * as JSONAPI from 'jsonapi-typescript';

export interface Controller {
  index?: RequestHandler;
  create?: RequestHandler;
  show?: RequestHandler;
  update?: RequestHandler;
  destroy?: RequestHandler;
}

export const resourceNotFound = () => {
  const errorResponse: JSONAPI.ErrorObject = {
    title: 'Resource not found',
    status: ReasonPhrases.NOT_FOUND,
  };

  return errorResponse;
};

export const internalServerError = (error: any) => {
  const errorResponse: JSONAPI.ErrorObject = {
    title: 'Internal Server Error',
    status: ReasonPhrases.NOT_FOUND,
    meta: error,
  };

  return errorResponse;
};
