import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import type { APIErrorInterface } from './api-error';

export default class ResourceNotFoundError extends Error implements APIErrorInterface {
  readonly statusCode;

  constructor() {
    super();

    this.name = 'ResourceNotFoundError';
    this.statusCode = StatusCodes.NOT_FOUND;
  }

  toJSON() {
    return {
      status: getReasonPhrase(this.statusCode),
      title: this.name,
      detail: this.message,
    };
  }
}
