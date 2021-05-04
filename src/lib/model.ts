import * as JSONAPI from 'jsonapi-typescript';
import { Model } from 'sequelize';

export interface ModelAttributes {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export abstract class AppModel<
  TModelAttributes extends ModelAttributes,
  TCreationAttributes extends {} = TModelAttributes
> extends Model<TModelAttributes, TCreationAttributes>
  implements ModelAttributes {
  public id!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

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
}
