import type * as SequelizeDefault from 'sequelize';

export default {
  up: async (
    queryInterface: SequelizeDefault.QueryInterface,
    Sequelize: typeof SequelizeDefault,
  ) => {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        references: {
          model: 'Users',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      content: Sequelize.STRING,
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
    await queryInterface.dropTable('Posts');
  },
};
