import db from '../lib/db';

import Session from './session-model';
import User from './user-model';

Session.initialize(db);
User.initialize(db);

export {
  Session,
  User,
};
