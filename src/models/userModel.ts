import type { Optional, Sequelize } from 'sequelize';
import { DataTypes } from 'sequelize';

import type { ModelAttributes } from '../lib/model';
import { AppModel } from '../lib/model';

// TODO: Do we really need strict-typing-for-attributes?
// https://sequelize.org/master/manual/typescript.html#usage-without-strict-types-for-attributes

interface UserAttributes extends ModelAttributes {
  name: string;
  screenName: string;
  email: string;
  password: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes extends Optional<UserAttributes, 'createdAt' | 'id' | 'updatedAt'> { }

class User extends AppModel<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public name!: string;

  public screenName!: string;

  public email!: string;

  public password!: string;

  static initialize(sequelize: Sequelize) {
    User.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
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
        modelName: 'User',
        tableName: 'Users',
      },
    );
  }
}

export default User;
