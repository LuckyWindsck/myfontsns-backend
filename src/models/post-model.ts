import type { Optional, Sequelize } from 'sequelize';
import { DataTypes } from 'sequelize';

import type { ModelAttributes } from '../lib/model';
import { AppModel } from '../lib/model';

// TODO: Do we really need strict-typing-for-attributes?
// https://sequelize.org/master/manual/typescript.html#usage-without-strict-types-for-attributes

interface PostAttributes extends ModelAttributes {
  userId: number;
  content: string;
}

// Some attributes are optional in `Post.build` and `Post.create` calls
interface PostCreationAttributes extends Optional<PostAttributes, 'createdAt' | 'id' | 'updatedAt'> { }

class Post
  extends AppModel<PostAttributes, PostCreationAttributes>
  implements PostAttributes {
  userId!: number;

  content!: string;

  static initialize(sequelize: Sequelize) {
    Post.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        userId: {
          references: {
            model: 'Users',
            key: 'id',
          },
          type: DataTypes.INTEGER,
        },
        content: DataTypes.STRING,
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
        modelName: 'Post',
        tableName: 'Posts',
      },
    );
  }
}

export default Post;
