import db from '../lib/db';
import User from './userModel';

User.initialize(db);

export {
  User,
};

export default {
  User,
};
