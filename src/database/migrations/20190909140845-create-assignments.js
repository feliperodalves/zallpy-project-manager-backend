module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('assignments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      project_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'projects',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'SET NULL',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('assignments');
  },
};
