import type * as JSONAPI from 'jsonapi-typescript';
import type { Optional, Sequelize } from 'sequelize';
import { DataTypes } from 'sequelize';

import type { ModelAttributes } from '../lib/model';
import { AppModel } from '../lib/model';

interface SessionAttributes extends ModelAttributes {
  sid: string;
  data: string;
  expires: Date;
}

interface SessionCreationAttributes extends Optional<SessionAttributes, 'createdAt' | 'id' | 'updatedAt'> { }

class Session
  extends AppModel<SessionAttributes, SessionCreationAttributes>
  implements SessionAttributes {
  sid!: string;

  data!: string;

  expires!: Date;

  convert() {
    const {
      id,
      createdAt,
      updatedAt,
      sid,
    } = this.get();

    const primaryData: JSONAPI.PrimaryData = {
      type: this.constructor.name,
      id: JSON.stringify(id),
      attributes: {
        createdAt: JSON.parse(JSON.stringify(createdAt)),
        updatedAt: JSON.parse(JSON.stringify(updatedAt)),
        sid,
      },
    };

    return primaryData;
  }

  static initialize(sequelize: Sequelize) {
    Session.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      sid: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      data: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      expires: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    }, {
      sequelize,
      modelName: 'Session',
      tableName: 'Sessions',
    });
  }
}

export default Session;
