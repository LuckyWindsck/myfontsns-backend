import type * as SequelizeDefault from 'sequelize';

import * as fonts from './font-seeder.json';
import UserFactory from '../factories/user-factory';

module.exports = {
  up: async (
    queryInterface: SequelizeDefault.QueryInterface,
    _Sequelize: typeof SequelizeDefault,
  ) => {
    await queryInterface.bulkInsert('Users', UserFactory.count(25), {});
    await queryInterface.bulkInsert('Fonts', fonts.map((font) => {
      const timestamp = new Date();

      return {
        userId: 1,
        ...font,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
    }), {});
  },

  down: async (
    queryInterface: SequelizeDefault.QueryInterface,
    _Sequelize: typeof SequelizeDefault,
  ) => {
    await queryInterface.bulkDelete('Fonts', null, {});
    await queryInterface.bulkDelete('Posts', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
