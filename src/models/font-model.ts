import type { Optional, Sequelize } from 'sequelize';
import { DataTypes } from 'sequelize';

import type { ModelAttributes } from '../lib/model';
import { AppModel } from '../lib/model';

// TODO: Do we really need strict-typing-for-attributes?
// https://sequelize.org/master/manual/typescript.html#usage-without-strict-types-for-attributes

interface FontAttributes extends ModelAttributes {
  userId: number;
  character: string;
  data: string;
  formatVersion: string;
}

// Some attributes are optional in `Font.build` and `Font.create` calls
interface FontCreationAttributes extends Optional<FontAttributes, 'createdAt' | 'id' | 'updatedAt'> { }

class Font
  extends AppModel<FontAttributes, FontCreationAttributes>
  implements FontAttributes {
  userId!: number;

  character!: string;

  data!: string;

  formatVersion!: string;

  static initialize(sequelize: Sequelize) {
    Font.init(
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
        character: DataTypes.STRING,
        data: DataTypes.STRING,
        formatVersion: DataTypes.STRING,
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
        modelName: 'Font',
        tableName: 'Fonts',
      },
    );
  }
}

export default Font;
