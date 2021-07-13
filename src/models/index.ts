import db from '../lib/db';

import Font from './font-model';
import Post from './post-model';
import Session from './session-model';
import User from './user-model';

Font.initialize(db);
Post.initialize(db);
Session.initialize(db);
User.initialize(db);

User.hasMany(Font, { foreignKey: 'userId' });
Font.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

export {
  Font,
  Post,
  Session,
  User,
};
