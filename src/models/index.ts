import db from '../lib/db';

import User from './userModel';

User.initialize(db);

export {
  // eslint-disable-next-line import/prefer-default-export
  User,
};
