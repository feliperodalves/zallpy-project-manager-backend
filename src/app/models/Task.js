import Sequelize, { Model } from 'sequelize';

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.TEXT,
        date: Sequelize.DATE,
        time: Sequelize.TIME,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Assignment, {
      foreignKey: 'assignment_id',
      as: 'assign',
    });
  }
}

export default Task;
