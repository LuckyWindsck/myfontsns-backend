import express from 'express';

import Router from '../routes';

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// class NewError extends Error {
//   constructor(message?: string|undefined) {
//     super(message);
//     this.name = 'NewError';
//   }
// }

app.use('/', Router);
// app.use('/test', (req, res) => {
//   throw new NewError('abc');
// });

// const errorHanlder: express.ErrorRequestHandler = (err, req, res, next) => {
//   console.log(err instanceof NewError);
//   next(err);
// };

// app.use(errorHanlder);

export default app;
