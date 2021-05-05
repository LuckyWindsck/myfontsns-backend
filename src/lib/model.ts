import type * as JSONAPI from 'jsonapi-typescript';
import { Model } from 'sequelize';

import { ResourceNotFoundError } from '../util/errors';

export interface ModelAttributes {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export class AppModel<
  TModelAttributes extends ModelAttributes,
  TCreationAttributes extends {} = TModelAttributes
> extends Model<TModelAttributes, TCreationAttributes>
  implements ModelAttributes {
  id!: number;

  readonly createdAt!: Date;

  readonly updatedAt!: Date;

  convert() {
    const {
      id,
      createdAt,
      updatedAt,
      ...attributes
    } = this.get();

    const primaryData: JSONAPI.PrimaryData = {
      type: this.constructor.name,
      id: JSON.stringify(id),
      attributes: {
        createdAt: JSON.parse(JSON.stringify(createdAt)),
        updatedAt: JSON.parse(JSON.stringify(updatedAt)),
        ...attributes,
      },
    };

    return primaryData;
  }

  static async getById(id: string) {
    const result = await this.findByPk(id);

    if (result === null) throw new ResourceNotFoundError();

    return result;
  }
}
