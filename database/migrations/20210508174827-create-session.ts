import type * as SequelizeDefault from 'sequelize';

export default {
  up: async (
    queryInterface: SequelizeDefault.QueryInterface,
    Sequelize: typeof SequelizeDefault,
  ) => {
    await queryInterface.createTable('Sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sid: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      data: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      expires: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (
    queryInterface: SequelizeDefault.QueryInterface,
    _Sequelize: typeof SequelizeDefault,
  ) => {
    await queryInterface.dropTable('Sessions');
  },
};
