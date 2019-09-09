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
          model: 'users', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onDelete: 'CASCADE',
      },
      project_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'projects', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onDelete: 'CASCADE',
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onDelete: 'SET NULL',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('assignments');
  },
};
