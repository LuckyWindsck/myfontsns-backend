import type { Result } from 'express-validator';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import type { APIErrorInterface } from './api-error';

export default class ValidationError extends Error implements APIErrorInterface {
  readonly statusCode;

  readonly errors;

  constructor(errors: Result) {
    super();

    this.name = 'Validation Error';
    this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;

    this.errors = errors;
  }

  toJSON() {
    return {
      status: getReasonPhrase(this.statusCode),
      title: this.name,
      detail: this.message,
      meta: this.errors.mapped ? this.errors.mapped() : this.errors,
    };
  }
}
