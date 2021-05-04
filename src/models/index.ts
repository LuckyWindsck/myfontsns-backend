import db from '../lib/db';
import UserInit from './user';

const User = UserInit(db);

export {
  // eslint-disable-next-line import/prefer-default-export
  User,
};
