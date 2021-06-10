import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import type { APIErrorInterface } from './api-error';

export default class UnauthorizedError extends Error implements APIErrorInterface {
  readonly statusCode;

  constructor() {
    super();

    this.name = 'Unauthorized Error';
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }

  toJSON() {
    return {
      status: getReasonPhrase(this.statusCode),
      title: this.name,
      detail: this.message,
    };
  }
}
