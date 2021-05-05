import type * as SequelizeDefault from 'sequelize';

export default {
  up: async (
    queryInterface: SequelizeDefault.QueryInterface,
    Sequelize: typeof SequelizeDefault,
  ) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      screenName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Users');
  },
};
