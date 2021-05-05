import type { ErrorRequestHandler } from 'express';

import {
  InternalServerError,
  ResourceNotFoundError,
  ValidationError,
} from '../errors';
import { docWithErrors } from '../json-api';

const errorHanlder: ErrorRequestHandler = (err, req, res, _next) => {
  console.log(err);

  const flag = [
    ResourceNotFoundError,
    ValidationError,
  ].some((constructor) => err instanceof constructor);

  const error = flag ? err : new InternalServerError(err);

  res.status(error.statusCode).send(docWithErrors(error.toJSON()));
};

export default errorHanlder;
