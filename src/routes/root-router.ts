import { Router } from 'express';

const RootRouter = Router();

RootRouter.get('/', (req, res) => {
  res.send('Hello World!');
});

export default RootRouter;
