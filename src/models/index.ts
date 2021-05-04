import db from '../lib/db';
import UserInit from './user';

const User = UserInit(db);

export {
  User,
};

export default {
  User,
};
