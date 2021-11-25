import bcrypt from 'bcrypt';
import type {
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  Optional,
  Sequelize,
} from 'sequelize';
import { DataTypes } from 'sequelize';

import type { ModelAttributes } from '../lib/model';
import { AppModel } from '../lib/model';

import type Font from './font-model';
import type Post from './post-model';

// TODO: Do we really need strict-typing-for-attributes?
// https://sequelize.org/master/manual/typescript.html#usage-without-strict-types-for-attributes

const saltRounds = 10;
interface UserAttributes extends ModelAttributes {
  name: string;
  screenName: string;
  email: string;
  password: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes extends Optional<UserAttributes, 'createdAt' | 'id' | 'updatedAt'> { }

class User
  extends AppModel<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  name!: string;

  screenName!: string;

  email!: string;

  password!: string;

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  getFonts!: HasManyGetAssociationsMixin<Font>;

  createFont!: HasManyCreateAssociationMixin<Font>;

  getPosts!: HasManyGetAssociationsMixin<Post>;

  createPost!: HasManyCreateAssociationMixin<Post>;

  static initialize(sequelize: Sequelize) {
    User.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        // TODO: name should be unique
        name: DataTypes.STRING,
        screenName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        hooks: {
          beforeCreate: async (user, _options) => {
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);
            Object.assign(user, { password: hashedPassword });
          },
          beforeUpdate: async (user, _options) => {
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);
            Object.assign(user, { password: hashedPassword });
          },
        },
        modelName: 'User',
        tableName: 'Users',
        paranoid: true,
      },
    );
  }

  static async getById(id: string) {
    return super.getById(id) as Promise<User>;
  }
}

export default User;
