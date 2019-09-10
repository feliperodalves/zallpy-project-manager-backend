module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('tasks', 'assignment_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'assignments',
        key: 'id',
      },
      allowNull: false,
      onDelete: 'CASCADE',
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('tasks', 'assignment_id');
  },
};
