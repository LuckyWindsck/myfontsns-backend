import { RequestHandler } from 'express';

export interface Controller {
  index?: RequestHandler;
  create?: RequestHandler;
  show?: RequestHandler;
  update?: RequestHandler;
  destroy?: RequestHandler;
}
