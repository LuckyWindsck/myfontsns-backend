import db from '../lib/db';
import User from './userModel';

User.initialize(db);

export {
  User,
};

// for db-console import, only models here
export default {
  User,
};
