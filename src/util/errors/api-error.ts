import type { StatusCodes } from 'http-status-codes';
import type { ErrorObject } from 'jsonapi-typescript';

export interface APIErrorInterface {
  statusCode: StatusCodes;

  toJSON: () => ErrorObject;
}
