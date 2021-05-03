import {
  Model, Sequelize, DataTypes, Optional,
} from 'sequelize';

import { ModelAttributes } from '../lib/model';

interface UserAttributes extends ModelAttributes {
  name: string;
  screenName: string;
  email: string;
  password: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

// class User extends Model {
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;

  public name!: string;

  public screenName!: string;

  public email!: string;

  public password!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
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

  return User;
};
