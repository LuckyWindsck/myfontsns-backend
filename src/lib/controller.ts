import * as JSONAPI from 'jsonapi-typescript';
import { RequestHandler } from 'express';
import { ReasonPhrases } from 'http-status-codes';

export interface Controller {
  index?: RequestHandler;
  create?: RequestHandler;
  show?: RequestHandler;
  update?: RequestHandler;
  destroy?: RequestHandler;
}

export function resourceNotFound() {
  const error: JSONAPI.ErrorObject = {
    title: 'Resource not found',
    status: ReasonPhrases.NOT_FOUND,
  };

  return error;
}
