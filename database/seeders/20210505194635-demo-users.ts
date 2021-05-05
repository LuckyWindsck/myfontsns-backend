import type * as SequelizeDefault from 'sequelize';

import UserFactory from '../factories/user-factory';

module.exports = {
  up: async (
    queryInterface: SequelizeDefault.QueryInterface,
    _Sequelize: typeof SequelizeDefault,
  ) => {
    await queryInterface.bulkInsert('Users', UserFactory.count(25), {});
  },

  down: async (
    queryInterface: SequelizeDefault.QueryInterface,
    _Sequelize: typeof SequelizeDefault,
  ) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
